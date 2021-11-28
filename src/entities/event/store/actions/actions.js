import {
    SET_EVENT,
    UNSET_EVENT,
    SET_EVENT_RACES,
    SET_EVENT_NAV_DATA,
} from '../types';

import { downloadUsersData } from '../../../../shared/store/actions/users';

import { firebaseLib } from '../../../../shared/lib';

const unique = (array) => array.filter((v, i, a) => a.indexOf(v) === i);

export const setEventNavData = (data) => async (dispatch) => {
    dispatch({ type: SET_EVENT_NAV_DATA, payload: data });
};

export const showEvent = (id) => async (dispatch) => {
    dispatch({
        type: SET_EVENT,
        payload: { id },
    });

    const eventRaces = await firebaseLib.getEventRaces(id);

    let userIds = [];
    if (eventRaces.length) {
        userIds = unique(eventRaces.map((race) => race.userId));

        await dispatch(
            downloadUsersData(userIds),
        );
    }

    dispatch({
        type: SET_EVENT_RACES,
        payload: eventRaces,
    });
};

export const hideEvent = () => async (dispatch) => dispatch({ type: UNSET_EVENT });
