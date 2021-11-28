import React, { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { eventsSelectors } from '../store';
import { eventSelectors } from '../../event/store';

import { Markers } from './Markers';
import { Route } from './Route';
import { SharedComponents } from '../../../shared';

export const Map = ({
    initialRegion,
    onUserLocationChange,
    onEventPress,
    onEventNavDataReady,
    bottomPadding = 520,
}) => {
    const mapRef = useRef(null);
    const { events } = useSelector(eventsSelectors.getEvents);
    const event = useSelector(eventSelectors.getCurrentEventMeta);

    useEffect(() => {
        mapRef.current?.animateToRegion(initialRegion, 300);
    }, [initialRegion]);

    return (
        <SharedComponents.Map
            initialRegion={initialRegion}
            onUserLocationChange={onUserLocationChange}
            ref={mapRef}
        >
            <Markers event={event} events={events} onEventPress={onEventPress} />
            {event && (
                <Route
                    event={event}
                    onReady={(result) => {
                        if (onEventNavDataReady) {
                            onEventNavDataReady({
                                distance: result.distance,
                                duration: result.duration,
                            });
                        }

                        mapRef.current?.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                top: 90,
                                bottom: bottomPadding,
                                left: 50,
                                right: 50,
                            },
                        });
                    }}
                />
            )}
        </SharedComponents.Map>
    );
};
