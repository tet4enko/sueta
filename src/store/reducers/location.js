import {
    GET_LOCATION_START,
    GET_LOCATION_SUCCESS,
    UPDATE_LOCATION,
} from '../types';

const initialState = {
    location: null,
    isLoading: true,
    isLoaded: false,
};

export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_LOCATION_START:
        return {
            ...state,
            isLoading: true,
        };
    case GET_LOCATION_SUCCESS:
        return {
            ...state,
            location: {
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
            },
            isLoading: false,
            isLoaded: true,
        };
    case UPDATE_LOCATION:
        const actionLatitude = action.payload.latitude;
        const actionLongitude = action.payload.longitude;
        const actionSpeed = action.payload.speed;

        // если локация не изменилась, не обновляем стейт
        if (state.location && state.location.latitude === actionLatitude && state.longitude === actionLongitude) {
            return state;
        }

        return {
            ...state,
            location: {
                latitude: actionLatitude,
                longitude: actionLongitude,
                speed: actionSpeed,
            },
        };
    default:
        return state;
    }
};
