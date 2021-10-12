import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

export const Route = ({
    event: {
        startLatitude, startLongitude, finishLatitude, finishLongitude,
    },
    onReady,
}) => (
    <MapViewDirections
        origin={{ latitude: startLatitude, longitude: startLongitude }}
        destination={{ latitude: finishLatitude, longitude: finishLongitude }}
        apikey="AIzaSyBQjy78ZlFHuPdJFY9wiiNDhuJJlwNgmiQ"
        strokeWidth={3}
        strokeColor="green"
        optimizeWaypoints
        onReady={onReady}
    />
);

export default Route;
