/* eslint-disable camelcase */
import {
    SET_USER_DATA,
    SET_CURRENT_USER,
} from '../types';

import { instagramLib, firebaseLib } from '../../../../shared/lib';

const isTried = [];

export const getUserProfile = (userId_) => async (dispatch) => {
    const userId = String(userId_);

    if (isTried.includes(userId)) {
        return;
    }

    isTried.push(userId_);

    const data = await firebaseLib.getUserInfo(userId);

    if (!data) {
        return;
    }

    dispatch({
        type: SET_USER_DATA,
        payload: { id: userId, data },
    });
};

const getUserBasicInfo = async (userId_, token) => {
    const userId = String(userId_);

    const data = await instagramLib.api(`/v11.0/${userId}?fields=id,username&access_token=${token}`);

    return data;
};

export const setCurrentUser = (id, token) => async (dispatch) => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: id,
    });

    const userBasicInfo = await getUserBasicInfo(id, token);

    const userDataToSave = { username: userBasicInfo.username };

    firebaseLib.updateUserInfo(id, userDataToSave);

    dispatch({
        type: SET_USER_DATA,
        payload: { id, data: userDataToSave },
    });
};
