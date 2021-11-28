import React, {
    useCallback, useRef, useState, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    View, StyleSheet,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { useIsOnLocation } from '../../shared/model/hooks';

import { EventsMap } from '../../entities/events/components';
import {
    getLocation,
} from '../../shared/store/selectors/location';

import { userSelectors } from '../../entities/user/store';
import { eventSelectors } from '../../entities/event/store';
import { updateLocation } from '../../shared/store/actions/location';
import { raceSelectors, raceActions } from '../../entities/race/store';
import { getUser } from '../../shared/store/selectors/users';

import { TrafficLightModal } from './TrafficLightModal';
import { RaceProgressModal } from './RaceProgressModal';

import { SharedComponents } from '../../shared';

export const screen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { location } = useSelector(getLocation);
    const eventMeta = useSelector(eventSelectors.getCurrentEventMeta);
    const currentUserId = useSelector(userSelectors.getCurrentUserId);
    const currentUserData = useSelector(getUser(currentUserId));
    const isTrafficLightVisible = useSelector(raceSelectors.getTrafficLightVisibility);
    const trafficLightColor = useSelector(raceSelectors.getTrafficLightColor);
    const isResultsReady = useSelector(raceSelectors.getIsResultsReady);
    const resultsData = useSelector(raceSelectors.getResultsData);
    const startTime = useSelector(raceSelectors.getStartTime);
    const finishTime = useSelector(raceSelectors.getFinishTime);
    const [isRaceProgressModalVisible, setIsRaceProgressModalVisible] = useState(false);
    const isOnStart = useIsOnLocation(
        eventMeta.startLatitude,
        eventMeta.startLongitude,
        location.latitude,
        location.longitude,
    );

    // Выходим из события, если до старта гонки уехали со стартовой точки
    useEffect(() => {
        if (!isOnStart && !startTime && !isTrafficLightVisible) {
            handleExit();
        }
    }, [isOnStart]);

    const handleOnStartButtonPress = useCallback(async () => {
        await dispatch(raceActions.startRace());
        setTimeout(() => {
            setIsRaceProgressModalVisible(true);
        }, 300);
    }, [raceActions.startRace]);

    // ФАЛЬСТАРТ
    // useEffect(() => {
    //     if (isTrafficLightVisible && trafficLightColor !== 'green' && location.speed) {
    //         dispatch(resetRace());
    //         Alert.alert('Фальстарт! Попробуйте еще раз!');
    //     }
    // }, [isTrafficLightVisible, trafficLightColor, location.speed]);

    const handleOnUserLocationChange = useCallback(({ nativeEvent: { coordinate } }) => {
        if (!isFocused) {
            return;
        }

        if (
            location
            && location.latitude === coordinate.latitude
            && location.longitude === coordinate.longitude
            && location.speed === coordinate.speed) {
            return;
        }

        dispatch(
            updateLocation(
                coordinate.latitude,
                coordinate.longitude,
                coordinate.speed,
            ),
        );

        if (startTime && !finishTime && location) {
            dispatch(
                raceActions.checkIsFinish(
                    location.latitude,
                    location.longitude,
                    eventMeta.finishLatitude,
                    eventMeta.finishLongitude,
                    startTime,
                    eventMeta.id,
                    currentUserId,
                    currentUserData,
                ),
            );
        }
    }, [eventMeta, location, isFocused, startTime, finishTime]);

    const handleExit = useCallback(
        () => {
            dispatch(raceActions.resetRace());
            navigation.goBack();
        },
        [],
    );

    const initialRegion = useRef({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
    });

    return (
        <View style={styles.center}>
            <EventsMap
                initialRegion={initialRegion.current}
                onUserLocationChange={handleOnUserLocationChange}
                bottomPadding={180}
            />
            <View style={styles.buttons}>
                <SharedComponents.StartButton
                    onPress={handleOnStartButtonPress}
                    startText="Cтарт"
                    eventLatitude={eventMeta.startLatitude}
                    eventLongitude={eventMeta.startLongitude}
                    isAction
                    style={styles.button}
                />
                <SharedComponents.NavigateButton
                    latitude={eventMeta.finishLatitude}
                    longitude={eventMeta.finishLongitude}
                    text="Проложить маршрут"
                    style={styles.button}
                />
            </View>
            <TrafficLightModal isVisible={isTrafficLightVisible} color={trafficLightColor} />
            <RaceProgressModal
                isVisible={isRaceProgressModalVisible}
                startTime={startTime}
                finishTime={finishTime}
                isResultsReady={isResultsReady}
                resultsData={resultsData}
                onExit={handleExit}
            />
        </View>
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
    buttons: {
        position: 'absolute',
        bottom: 30,
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 310,
        marginVertical: 10,
    },
});
