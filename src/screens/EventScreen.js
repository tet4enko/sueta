import React, {
    useCallback, useRef, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    View, StyleSheet, Dimensions, Animated,
} from 'react-native';
import MapView from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import InsetShadow from 'react-native-inset-shadow';

import Stopwatch from '../shared/components/ui/Stopwatch';
import NavigateButton from '../shared/components/NavigateButton';

import { RaceModalize, TrafficLight } from '../entities/race/components';
// import { EventMarkers } from '../entities/map/components';
import {
    getLocation,
} from '../store/selectors';

import { eventSelectors } from '../entities/event/store';
import { raceSelectors, raceActions } from '../entities/race/store';

import CancelButton from '../shared/components/CancelButton';
import StartButton from '../shared/components/StartButton';
import { Finish } from '../shared/components/ui/Finish';

const buttonsWidth = Dimensions.get('window').width - 150;

const EventScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const { location } = useSelector(getLocation);
    const eventMeta = useSelector(eventSelectors.getCurrentEventMeta);
    const isTrafficLightVisible = useSelector(raceSelectors.getTrafficLightVisibility);
    const trafficLightColor = useSelector(raceSelectors.getTrafficLightColor);
    const startTime = useSelector(raceSelectors.getStartTime);
    const finishTime = useSelector(raceSelectors.getFinishTime);
    const raceCard = useSelector(raceSelectors.getRaceCurrentRaceCard);

    const modalizeRef = useRef(null);

    const handleOnStartButtonPress = useCallback(() => {
        dispatch(raceActions.startRace());
    }, [raceActions.startRace]);

    const trafficLightOpacity = useRef(new Animated.Value(1)).current;
    const startTrafficLightHide = () => {
        Animated.timing(
            trafficLightOpacity,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            },
        ).start(() => {
            dispatch(raceActions.hideTrafficLight());
        });
    };

    useEffect(() => {
        if (trafficLightColor === 'green') {
            setTimeout(startTrafficLightHide, 1000);
        }
    }, [trafficLightColor]);

    useEffect(() => {
        if (isTrafficLightVisible && trafficLightColor !== 'green' && location.speed) {
            // dispatch(resetRace());
            // Alert.alert('Фальстарт! Попробуйте еще раз!');
        }
    }, [isTrafficLightVisible, trafficLightColor, location.speed]);

    useEffect(() => {
        if (!startTime || finishTime) {
            return;
        }

        dispatch(
            raceActions.checkIsFinish(
                location.latitude,
                location.longitude,
                eventMeta.finishLatitude,
                eventMeta.finishLongitude,
                startTime,
                eventMeta.id,
            ),
        );
    }, [
        startTime,
        finishTime,
        location.latitude,
        location.longitude,
        eventMeta.finishLatitude,
        eventMeta.finishLongitude,
        eventMeta.id,
    ]);

    useEffect(() => {
        if (raceCard) {
            modalizeRef.current?.open();
        }
    }, [raceCard]);

    const initialRegion = useRef({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
    });

    const mapViewProps = useMemo(() => {
        const result = {
            style: styles.map,
            provider: 'google',
            initialRegion: initialRegion.current,
            showsUserLocation: true,
            showsMyLocationButton: !startTime,
            zoomEnabled: !startTime,
            showsBuildings: false,
        };

        return result;
    }, [styles, initialRegion, location, startTime]);

    return (
        <InsetShadow
            shadowRadius={10}
            shadowOpacity={!isTrafficLightVisible && startTime ? 0.6 : 0}
            shadowColor={colors.primary}
        >
            <View style={styles.center}>
                <MapView {...mapViewProps}>
                    {/* <EventMarkers event={eventMeta} /> */}
                </MapView>
                {!finishTime && (
                    <View style={{ ...styles.button, ...styles.cancelButton }}>
                        <CancelButton
                            buttonText="Покинуть событие"
                            alertTitle="Выход"
                            alertText="Вы точно хотите покинуть событие?"
                            alertCancelText="Отмена"
                            alertOkText="Да"
                            onPress={() => {
                                navigation.goBack();
                                dispatch(raceActions.resetRace());
                            }}
                        />
                    </View>
                )}
                {
                    finishTime && (
                        <View style={{ ...styles.finish, backgroundColor: colors.primary }}>
                            <Finish />
                        </View>
                    )
                }
                {!startTime && !finishTime && !raceCard && (
                    <View style={{ ...styles.button, ...styles.startButton }}>
                        <StartButton
                            onPress={handleOnStartButtonPress}
                            startText="Начать заезд!"
                            eventLatitude={eventMeta.startLatitude}
                            eventLongitude={eventMeta.startLongitude}
                            userLatitude={location.latitude}
                            userLongitude={location.longitude}
                        />
                    </View>
                )}
                {!startTime && !finishTime && !raceCard && (
                    <View style={{ ...styles.button, ...styles.navigateButton }}>
                        <NavigateButton
                            latitude={eventMeta.finishLatitude}
                            longitude={eventMeta.finishLongitude}
                            text="Маршрут до финиша"
                        />
                    </View>
                )}
                {startTime && (
                    <View style={styles.stopwatch}>
                        <Stopwatch
                            msecs
                            start={Boolean(startTime && !finishTime)}
                        />
                    </View>
                )}
                {isTrafficLightVisible && (
                    <TrafficLight color={trafficLightColor} style={{ opacity: trafficLightOpacity }} />
                )}
                {raceCard && (
                    <RaceModalize
                        ref={modalizeRef}
                        race={raceCard.raceData}
                        position={raceCard.positionData}
                        event={eventMeta}
                        onPressBack={() => {
                            modalizeRef.current?.close();
                            navigation.goBack();
                            dispatch(raceActions.resetRace());
                        }}
                    />
                )}
            </View>
        </InsetShadow>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    button: {
        position: 'absolute',
        width: buttonsWidth,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.37,
        shadowRadius: 4.65,

        elevation: 6,
    },
    cancelButton: {
        bottom: 40,
    },
    startButton: {
        bottom: 160,
    },
    navigateButton: {
        bottom: 100,
    },
    stopwatch: {
        position: 'absolute',
        top: 30,
        width: buttonsWidth,
    },
    trafficLight: {},
    finish: {
        position: 'absolute',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 5,
    },
});

export default EventScreen;
