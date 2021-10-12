import {
    GET_EVENTS_START,
    GET_EVENTS_SUCCESS,
} from '../types';

const initialState = {
    events: [],
    eventId: null,
    eventRaces: null,
    eventNavData: null,
    isLoading: true,
    isLoaded: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_EVENTS_START:
        return {
            ...state,
            isLoading: true,
        };
    case GET_EVENTS_SUCCESS:
        return {
            ...state,
            events: action.payload.events,
            isLoading: false,
            isLoaded: true,
        };
    default:
        return state;
    }
};
