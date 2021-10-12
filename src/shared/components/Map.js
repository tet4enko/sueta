import React, { forwardRef } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

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
        showsMyLocationButton
        showsIndoors={false}
        onUserLocationChange={onUserLocationChange}
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
