import { instagramLib, firebaseLib } from '../../lib';

import { SET_USER } from '../types/users';

const getUserInstagramBasicInfo = async (userId_, token) => {
    const userId = String(userId_);

    const data = await instagramLib.api(`/v11.0/${userId}?fields=id,username&access_token=${token}`);

    return data;
};

export const downloadCurrentUserData = (id, token) => async (dispatch) => {
    const { username } = await getUserInstagramBasicInfo(id, token);

    const updatedUserData = await firebaseLib.updateUserUsername(
        id,
        username,
    );

    dispatch({
        type: SET_USER,
        payload: { id, data: updatedUserData },
    });
};

export const downloadUsersData = (ids) => async (dispatch) => {
    const data = await firebaseLib.downloadUsersData(ids);

    if (data && data.length) {
        data.forEach((user) => {
            dispatch({
                type: SET_USER,
                payload: { id: user.id, data: user.data },
            });
        });
    }
};

export const addCarToUser = (userId, car) => async (dispatch) => {
    const updatedUserData = await firebaseLib.addCarToUser(
        userId,
        car,
    );

    dispatch({
        type: SET_USER,
        payload: { id: userId, data: updatedUserData },
    });

    return updatedUserData;
};

export const removeCar = (userId, car) => async (dispatch) => {
    const updatedUserData = await firebaseLib.removeCar(
        userId,
        car,
    );

    dispatch({
        type: SET_USER,
        payload: { id: userId, data: updatedUserData },
    });

    return updatedUserData;
};

export const setCurrentCar = (userId, car) => async (dispatch) => {
    const updatedUserData = await firebaseLib.setCurrentCar(
        userId,
        car,
    );

    dispatch({
        type: SET_USER,
        payload: { id: userId, data: updatedUserData },
    });

    return updatedUserData;
};
