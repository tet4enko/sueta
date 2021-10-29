import { GET_LOCATION_START, GET_LOCATION_SUCCESS, UPDATE_LOCATION } from '../types/location';
import { locationLib } from '../../lib';

export const loadLocation = () => async (dispatch) => {
    dispatch({ type: GET_LOCATION_START });

    const { coords } = await locationLib.getLocation();

    dispatch({
        type: GET_LOCATION_SUCCESS,
        payload: {
            latitude: coords.latitude,
            longitude: coords.longitude,
        },
    });
};

export const updateLocation = (latitude, longitude, speed = 0) => ({
    type: UPDATE_LOCATION,
    payload: { latitude, longitude, speed },
});
