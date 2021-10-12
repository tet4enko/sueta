import {
    GET_EVENTS_START,
    GET_EVENTS_SUCCESS,
} from '../types';

import { getEvents } from '../../../../helpers/firebase';

export const loadEvents = () => async (dispatch) => {
    dispatch({ type: GET_EVENTS_START });

    const events = await getEvents();

    dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: { events },
    });
};
