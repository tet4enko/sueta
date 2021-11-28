import * as Location from 'expo-location';
import { Dimensions } from 'react-native';

const getMidpoint = function(...args) {
    // eslint-disable-next-line no-undef
    const points = args[0];

    return [
        points.reduce((acc, cur) => acc + cur[0], 0) / points.length,
        points.reduce((acc, cur) => acc + cur[1], 0) / points.length,
    ];
};

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
    // eslint-disable-next-line max-len
    const sortedEvents = events.sort((a, b) => calcCrow(a.startLatitude, a.startLongitude, location.latitude, location.longitude)
        - calcCrow(b.startLatitude, b.startLongitude, location.latitude, location.longitude)).slice(0, 3);
    const center = getMidpoint(sortedEvents.map((event) => [event.startLatitude, event.startLongitude]));

    const mostRemotePoint = sortedEvents[sortedEvents.length - 1];
    const distance = calcCrow(
        mostRemotePoint.startLatitude,
        mostRemotePoint.startLongitude,
        center[0],
        center[1],
    );

    return {
        latitude: center[0],
        longitude: center[1],
        latitudeDelta: (distance / Dimensions.get('window').height) * 17,
        longitudeDelta: (distance / Dimensions.get('window').width) * 17,
    };
};

export const calculateEventRegion = (event) => {
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
