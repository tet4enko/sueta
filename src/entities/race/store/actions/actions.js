import {
    SET_TRAFFIC_LIGHT_VISIBILITY,
    SET_TRAFFIC_LIGHT_COLOR,
    SET_START_TIME,
    SET_FINISH_TIME,
    SET_RESULTS_DATA,
    SET_IS_RESULTS_READY,
} from '../types';

import { firebaseLib, locationLib, constantsLib } from '../../../../shared/lib';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let isRevertedStart = false;

export const startRace = () => async (dispatch) => {
    isRevertedStart = false;

    dispatch({ type: SET_TRAFFIC_LIGHT_COLOR, payload: 'red' });
    dispatch({ type: SET_TRAFFIC_LIGHT_VISIBILITY, payload: true });

    await sleep(3000);

    if (isRevertedStart) {
        return;
    }

    dispatch({ type: SET_TRAFFIC_LIGHT_COLOR, payload: 'yellow' });

    await sleep(3000);

    if (isRevertedStart) {
        return;
    }

    dispatch({ type: SET_TRAFFIC_LIGHT_COLOR, payload: 'green' });
    dispatch({ type: SET_START_TIME, payload: new Date().valueOf() });

    await sleep(2000);

    dispatch({ type: SET_TRAFFIC_LIGHT_VISIBILITY, payload: false });
};

export const hideTrafficLight = () => async (dispatch) => {
    dispatch({ type: SET_TRAFFIC_LIGHT_VISIBILITY, payload: false });
};

export const resetRace = () => (dispatch) => {
    isRevertedStart = true;
    dispatch({ type: SET_TRAFFIC_LIGHT_COLOR, payload: 'red' });
    dispatch({ type: SET_TRAFFIC_LIGHT_VISIBILITY, payload: false });
    dispatch({ type: SET_START_TIME, payload: null });
    dispatch({ type: SET_FINISH_TIME, payload: null });
    dispatch({ type: SET_RESULTS_DATA, payload: null });
};

export const checkIsFinish = (
    latitude,
    longitude,
    finishLatitude,
    finishLongitude,
    startTime,
    eventId,
    userId,
    userData,
) => async (dispatch) => {
    const distance = locationLib.calcCrow(latitude, longitude, finishLatitude, finishLongitude);
    const isFinish = distance <= constantsLib.LOCATION_RADIUS;

    if (!isFinish) {
        return;
    }

    const finishTime = new Date().valueOf();

    dispatch({ type: SET_FINISH_TIME, payload: finishTime });

    if (!userId) {
        dispatch({ type: SET_IS_RESULTS_READY, payload: true });
        return;
    }

    const raceData = {
        car: (userData && userData.cars.find((car) => car.isCurrent)) || null,
        time: finishTime - startTime,
        userId,
        eventId,
    };

    const raceId = await firebaseLib.addRace(eventId, raceData);
    const stats = await firebaseLib.getUserEventStat(userId, eventId, raceId);

    dispatch({ type: SET_RESULTS_DATA, payload: stats });
    dispatch({ type: SET_IS_RESULTS_READY, payload: true });
};
