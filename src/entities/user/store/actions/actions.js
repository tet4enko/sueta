/* eslint-disable camelcase */
import {
    SET_USER,
} from '../types';

import { downloadCurrentUserData } from '../../../../shared/store/actions/users';

export const setUser = (id, token) => async (dispatch) => {
    dispatch({
        type: SET_USER,
        payload: id,
    });

    await dispatch(downloadCurrentUserData(id, token));
};
