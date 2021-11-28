import {
    SET_USER,
} from '../types/users';

const initialState = {};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_USER:
        return {
            ...state,
            [action.payload.id]: action.payload.data,
        };
    default:
        return state;
    }
};
