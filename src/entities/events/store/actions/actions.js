import {
    GET_EVENTS_START,
    GET_EVENTS_SUCCESS,
} from '../types';

import { firebaseLib } from '../../../../shared/lib';

export const loadEvents = () => async (dispatch) => {
    dispatch({ type: GET_EVENTS_START });

    const events = await firebaseLib.getEvents();

    dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: { events },
    });
};
