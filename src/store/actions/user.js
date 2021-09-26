/* eslint-disable camelcase */
import {
    SET_USER_DATA,
    SET_CURRENT_USER,
} from '../types';

import { api } from '../../helpers/instagram';
import { updateUserInfo, getUserInfo } from '../../helpers/firebase';

const isTried = [];

export const getUserProfile = (userId_) => async (dispatch) => {
    const userId = String(userId_);

    if (isTried.includes(userId)) {
        return;
    }

    isTried.push(userId_);

    const data = await getUserInfo(userId);

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

    const data = await api(`/v11.0/${userId}?fields=id,username&access_token=${token}`);

    return data;
};

export const setCurrentUser = (id, token) => async (dispatch) => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: id,
    });

    const userBasicInfo = await getUserBasicInfo(id, token);

    const userDataToSave = { username: userBasicInfo.username };

    updateUserInfo(id, userDataToSave);

    dispatch({
        type: SET_USER_DATA,
        payload: { id, data: userDataToSave },
    });
};
