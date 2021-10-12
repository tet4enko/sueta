import React, { useRef } from 'react';

import { useSelector } from 'react-redux';

import { eventsSelectors } from '../store';
import { eventSelectors } from '../../event/store';

import { Markers } from './Markers';
import { Route } from './Route';
import { SharedMap } from '../../../shared/components';

export const Map = ({
    initialRegion,
    onUserLocationChange,
    onEventPress,
    onEventNavDataReady,
}) => {
    const mapRef = useRef(null);
    const { events } = useSelector(eventsSelectors.getEvents);
    const event = useSelector(eventSelectors.getCurrentEventMeta);
    return (
        <SharedMap
            initialRegion={initialRegion}
            onUserLocationChange={onUserLocationChange}
            ref={mapRef}
        >
            <Markers event={event} events={events} onEventPress={onEventPress} />
            {event && (
                <Route
                    event={event}
                    onReady={(result) => {
                        onEventNavDataReady({
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
            )}
        </SharedMap>
    );
};
