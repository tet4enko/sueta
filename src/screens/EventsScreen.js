import React, {
    useEffect, useState, useRef,
    useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    View, StyleSheet, ActivityIndicator, Image,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import THEME from '../theme';
import EventModalize from '../components/EventModalize';
import EventMarkers from '../components/EventMarkers';

import { loadLocation, updateLocation } from '../store/actions/location';
import {
    loadEvents, showEvent, hideEvent, setEventNavData,
} from '../store/actions/events';
import { getLocation, getEvents, getCurrentEventMeta } from '../store/selectors';
import { calculateInitialRegion } from '../helpers/location';

const EventsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const {
        location,
        isLoading: isLocationLoading,
        isLoaded: isLocationLoaded,
    } = useSelector(getLocation);
    const {
        events,
        eventId,
        isLoading: isEventsLoading,
        isLoaded: isEventsLoaded,
    } = useSelector(getEvents);
    const eventMeta = useSelector(getCurrentEventMeta);

    const [initialRegion, setInitialRegion] = useState(null);

    const modalizeRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        dispatch(loadLocation());
        dispatch(loadEvents());
    }, []);

    useEffect(() => {
        if (!isLocationLoaded || !isEventsLoaded) {
            return;
        }

        setInitialRegion(calculateInitialRegion(location, events));
    }, [isLocationLoaded, isEventsLoaded]);

    useEffect(() => {
        if (eventId) {
            modalizeRef.current?.open();
        }
    }, [eventId]);

    const handleOnUserLocationChange = useCallback(({ nativeEvent: { coordinate } }) => {
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
    }, [updateLocation, location]);

    if (isLocationLoading || isEventsLoading || !initialRegion) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
            </View>
        );
    }

    let markers = events.map((item, index) => (
        <Marker
            key={index}
            coordinate={{ latitude: item.startLatitude, longitude: item.startLongitude }}
            onPress={() => dispatch(showEvent(item.id))}
        >
            <Image
                // eslint-disable-next-line global-require
                source={require('../../assets/start.png')}
                style={{ width: 32, height: 32 }}
                resizeMode="contain"
            />
            <Callout tooltip />
        </Marker>
    ));
    let route = null;

    if (eventId) {
        markers = <EventMarkers event={eventMeta} />;
        route = (
            <MapViewDirections
                origin={{ latitude: eventMeta.startLatitude, longitude: eventMeta.startLongitude }}
                destination={{ latitude: eventMeta.finishLatitude, longitude: eventMeta.finishLongitude }}
                apikey="AIzaSyBQjy78ZlFHuPdJFY9wiiNDhuJJlwNgmiQ"
                strokeWidth={3}
                strokeColor="green"
                optimizeWaypoints
                onReady={(result) => {
                    setEventNavData({
                        distance: result.distance,
                        duration: result.duration,
                    });

                    mapRef.current?.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                            top: 70,
                            bottom: 500,
                        },
                    });
                }}
            />
        );
    }

    return (
        (
            <View style={styles.center}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    provider="google"
                    initialRegion={{
                        latitude: initialRegion ? initialRegion.latitude : location.latitude,
                        longitude: initialRegion ? initialRegion.longitude : location.longitude,
                        latitudeDelta: initialRegion ? initialRegion.latitudeDelta : 0.0922,
                        longitudeDelta: initialRegion ? initialRegion.longitudeDelta : 0.0421,
                    }}
                    showsUserLocation
                    showsMyLocationButton
                    showsIndoors={false}
                    onUserLocationChange={handleOnUserLocationChange}
                >
                    {markers}
                    {route}
                </MapView>
                <EventModalize
                    ref={modalizeRef}
                    onClosed={() => dispatch(hideEvent())}
                    onPressBack={() => modalizeRef.current?.close()}
                    onPressStart={() => {
                        navigation.navigate('Event', { name: eventMeta.name });
                    }}
                />
            </View>
        )
    );
};

export default EventsScreen;

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
});
