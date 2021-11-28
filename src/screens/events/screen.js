import React, {
    useEffect, useState, useRef,
    useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {
    View, StyleSheet, ActivityIndicator,
} from 'react-native';

import { EventsMap } from '../../entities/events/components';
import { EventCard } from '../../entities/event/components';
import { loadLocation, updateLocation } from '../../shared/store/actions/location';
import { getLocation } from '../../shared/store/selectors/location';
import { eventsSelectors, eventsActions } from '../../entities/events/store';
import { eventSelectors, eventActions } from '../../entities/event/store';
import { locationLib, themeLib } from '../../shared/lib';
import { SharedComponents } from '../../shared';

export const screen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const {
        location,
        isLoading: isLocationLoading,
        isLoaded: isLocationLoaded,
    } = useSelector(getLocation);
    const {
        events,
        isLoading: isEventsLoading,
        isLoaded: isEventsLoaded,
    } = useSelector(eventsSelectors.getEvents);
    const eventId = useSelector(eventSelectors.getCurrentEventId);
    const eventMeta = useSelector(eventSelectors.getCurrentEventMeta);

    const [initialRegion, setInitialRegion] = useState(null);

    const modalizeRef = useRef(null);

    useEffect(() => {
        dispatch(loadLocation());
        dispatch(eventsActions.loadEvents());
    }, []);

    useEffect(() => {
        if (!isFocused || !isLocationLoaded || !isEventsLoaded) {
            return;
        }

        if (eventId) {
            dispatch(eventActions.hideEvent());
        }
        setInitialRegion(locationLib.calculateInitialRegion(location, events));
    }, [isLocationLoaded, isEventsLoaded, isFocused]);

    useEffect(() => {
        if (eventId) {
            modalizeRef.current?.open();
        } else if (location && events) {
            setInitialRegion(locationLib.calculateInitialRegion(location, events));
        }
    }, [eventId]);

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
    }, [updateLocation, location, isFocused]);

    if (isLocationLoading || isEventsLoading || !initialRegion) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={themeLib.MAIN_COLOR} />
            </View>
        );
    }

    return (
        (
            <View style={styles.center}>
                <EventsMap
                    initialRegion={initialRegion}
                    onUserLocationChange={handleOnUserLocationChange}
                    onEventNavDataReady={eventActions.setEventNavData}
                    onEventPress={(id) => dispatch(eventActions.showEvent(id))}
                />
                <EventCard
                    ref={modalizeRef}
                    onClosed={() => dispatch(eventActions.hideEvent())}
                    // onPressBack={() => modalizeRef.current?.close()}
                    onPressStart={() => {
                        navigation.navigate('Event', { name: eventMeta.name });
                    }}
                />
                <SharedComponents.UI.AppButton text="СОЗДАТЬ СОБЫТИЕ" style={styles.createEventButton} />
            </View>
        )
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createEventButton: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        width: 280,
    },
});
