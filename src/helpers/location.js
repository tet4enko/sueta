import * as Location from 'expo-location';
import { Dimensions } from 'react-native';

export const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        // TODO
        return;
    }

    const location = await Location.getCurrentPositionAsync({});

    return location;
};

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
export const calcCrow = (lat1, lon1, lat2, lon2) => {
    const toRad = (val) => (val * Math.PI) / 180;

    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(toRad(lat1)) * Math.cos(toRad(lat2));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
};

export const calculateInitialRegion = (location, events) => {
    const MAX_DISTANCE_TO_NEAREST_EVENT = 1000;

    const nearestEventDistance = events.reduce(
        (acc, cur) => Math.min(
            acc, calcCrow(cur.startLatitude, cur.startLongitude, location.latitude, location.longitude),
        ),
        MAX_DISTANCE_TO_NEAREST_EVENT,
    );

    return {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: (nearestEventDistance / Dimensions.get('window').height) * 17,
        longitudeDelta: (nearestEventDistance / Dimensions.get('window').width) * 17,
    };
};

export const calculateEventRegion = (event) => {
    const getMidpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];
    const [midpointLatitude, midpointLongitude] = getMidpoint(
        [event.startLatitude, event.startLongitude], [event.finishLatitude, event.finishLongitude],
    );

    const crow = calcCrow(event.startLatitude, event.startLongitude, event.finishLatitude, event.finishLongitude);

    return {
        latitude: midpointLatitude - (crow / 100),
        longitude: midpointLongitude,
        latitudeDelta: (crow / Dimensions.get('window').height) * 13,
        longitudeDelta: (crow / Dimensions.get('window').width) * 13,
    };
};
