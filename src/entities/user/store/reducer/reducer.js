import {
    SET_USER,
} from '../types';

const initialState = {
    id: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_USER:
        return {
            ...state,
            id: action.payload,
        };
    default:
        return state;
    }
};
