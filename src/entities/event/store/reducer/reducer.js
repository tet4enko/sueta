import {
    SET_EVENT,
    UNSET_EVENT,
    SET_EVENT_RACES,
    SET_EVENT_NAV_DATA,
} from '../types';

const initialState = {
    id: null,
    races: null,
    navData: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_EVENT:
        return {
            ...state,
            id: action.payload.id,
        };
    case UNSET_EVENT:
        return {
            ...state,
            id: null,
            races: null,
            navData: null,
        };
    case SET_EVENT_RACES:
        return {
            ...state,
            races: action.payload,
        };
    case SET_EVENT_NAV_DATA:
        return {
            ...state,
            navData: action.payload,
        };
    default:
        return state;
    }
};
