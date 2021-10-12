import {
    SET_EVENT,
    UNSET_EVENT,
    SET_EVENT_RACES,
    SET_EVENT_NAV_DATA,
} from '../types';

import { getEventRaces } from '../../../../helpers/firebase';

export const setEventNavData = (data) => async (dispatch) => {
    dispatch({ type: SET_EVENT_NAV_DATA, payload: data });
};

export const showEvent = (id) => async (dispatch) => {
    dispatch({
        type: SET_EVENT,
        payload: { id },
    });

    const eventRaces = await getEventRaces(id);

    dispatch({
        type: SET_EVENT_RACES,
        payload: eventRaces,
    });
};

export const hideEvent = () => async (dispatch) => dispatch({ type: UNSET_EVENT });
