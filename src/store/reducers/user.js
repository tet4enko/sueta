import {
    SET_USER_DATA,
    SET_CURRENT_USER,
} from '../types';

const initialState = {
    users: {},
    currentUserId: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_USER_DATA:
        return {
            ...state,
            users: {
                ...state.users,
                [action.payload.id]: action.payload.data,
            },
        };
    case SET_CURRENT_USER:
        return {
            ...state,
            currentUserId: action.payload,
        };
    default:
        return state;
    }
};
