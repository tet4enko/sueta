import React, { forwardRef } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

import mapJSON from '../configs/map.json';

export const Map = forwardRef(({
    initialRegion,
    onUserLocationChange,
    children,
}, ref) => (
    <MapView
        ref={ref}
        style={styles.map}
        provider="google"
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
        showsIndoors={false}
        onUserLocationChange={onUserLocationChange}
        customMapStyle={mapJSON}
    >
        {children}
    </MapView>
));

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});
