import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Image } from 'react-native';

const MARKER_SIZE = 45;

export const Markers = ({ event, events, onEventPress }) => (
    event ? (
        <>
            <Marker
                title="Старт"
                coordinate={{ latitude: event.startLatitude, longitude: event.startLongitude }}
            >
                <Image
                    // eslint-disable-next-line global-require
                    source={require('../../../../assets/start.png')}
                    style={{ width: MARKER_SIZE, height: MARKER_SIZE }}
                    resizeMode="contain"
                />
            </Marker>
            <Marker
                title="Финиш"
                coordinate={{ latitude: event.finishLatitude, longitude: event.finishLongitude }}
            >
                <Image
                    // eslint-disable-next-line global-require
                    source={require('../../../../assets/finish.png')}
                    style={{ width: MARKER_SIZE, height: MARKER_SIZE }}
                    resizeMode="contain"
                />
            </Marker>
        </>
    ) : (
        events.map((item, index) => (
            <Marker
                key={index}
                coordinate={{ latitude: item.startLatitude, longitude: item.startLongitude }}
                onPress={() => onEventPress(item.id)}
            >
                <Image
                // eslint-disable-next-line global-require
                    source={require('../../../../assets/event.png')}
                    style={{ width: MARKER_SIZE, height: 65 }}
                    resizeMode="contain"
                />
                <Callout tooltip />
            </Marker>
        )))
);
