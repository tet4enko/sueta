import {
    SET_TRAFFIC_LIGHT_VISIBILITY,
    SET_TRAFFIC_LIGHT_COLOR,
    SET_START_TIME,
    SET_FINISH_TIME,
    SET_CURRENT_RACE_CARD,
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
};

export const hideTrafficLight = () => async (dispatch) => {
    dispatch({ type: SET_TRAFFIC_LIGHT_VISIBILITY, payload: false });
};

export const resetRace = () => (dispatch) => {
    isRevertedStart = true;
    dispatch({ type: SET_TRAFFIC_LIGHT_COLOR, payload: 'red' });
    dispatch({ type: SET_TRAFFIC_LIGHT_VISIBILITY, payload: false });
    dispatch({ type: SET_START_TIME, payload: null });
    dispatch({ type: SET_CURRENT_RACE_CARD, payload: null });
};

export const checkIsFinish = (
    latitude,
    longitude,
    finishLatitude,
    finishLongitude,
    startTime,
    eventId,
) => async (dispatch) => {
    const distance = locationLib.calcCrow(latitude, longitude, finishLatitude, finishLongitude);
    const isFinish = distance <= constantsLib.LOCATION_RADIUS;

    if (!isFinish) {
        return;
    }

    const finishTime = new Date().valueOf();

    dispatch({ type: SET_FINISH_TIME, payload: finishTime });

    const user = 'Stig';

    const raceData = {
        car: 'Skoda на чипе',
        time: finishTime - startTime,
        user,
    };

    const raceId = await firebaseLib.addRace(eventId, raceData);

    const positionData = await firebaseLib.getUserEventStat(user, eventId, raceId);

    await sleep(3000);

    dispatch({ type: SET_TRAFFIC_LIGHT_COLOR, payload: 'red' });
    dispatch({ type: SET_TRAFFIC_LIGHT_VISIBILITY, payload: false });
    dispatch({ type: SET_START_TIME, payload: null });
    dispatch({ type: SET_FINISH_TIME, payload: null });

    dispatch({
        type: SET_CURRENT_RACE_CARD,
        payload: { raceData, positionData },
    });
};
