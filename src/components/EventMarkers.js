import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Image } from 'react-native';

const MARKER_SIZE = 32;

const EventMarkers = ({
    event: {
        startLatitude, startLongitude, finishLatitude, finishLongitude,
    },
}) => (
    <>
        <Marker
            coordinate={{ latitude: startLatitude, longitude: startLongitude }}
        >
            <Image
            // eslint-disable-next-line global-require
                source={require('../../assets/start.png')}
                style={{ width: MARKER_SIZE, height: MARKER_SIZE }}
                resizeMode="contain"
            />
            <Callout tooltip />
        </Marker>
        <Marker
            coordinate={{ latitude: finishLatitude, longitude: finishLongitude }}
        >
            <Image
            // eslint-disable-next-line global-require
                source={require('../../assets/finish.png')}
                style={{ width: MARKER_SIZE, height: MARKER_SIZE }}
                resizeMode="contain"
            />
            <Callout tooltip />
        </Marker>
    </>
);

export default EventMarkers;
