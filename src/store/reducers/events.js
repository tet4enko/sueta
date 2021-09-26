import {
    GET_EVENTS_START,
    GET_EVENTS_SUCCESS,
    SET_EVENT,
    UNSET_EVENT,
    SET_EVENT_RACES,
    SET_EVENT_NAV_DATA,
} from '../types';

const initialState = {
    events: [],
    eventId: null,
    eventRaces: null,
    eventNavData: null,
    isLoading: true,
    isLoaded: false,
};

export const eventsReducer = (state = initialState, action) => {
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
    case SET_EVENT:
        return {
            ...state,
            eventId: action.payload.id,
        };
    case UNSET_EVENT:
        return {
            ...state,
            eventId: null,
        };
    case SET_EVENT_RACES:
        return {
            ...state,
            eventRaces: action.payload,
        };
    case SET_EVENT_NAV_DATA:
        return {
            ...state,
            eventNavData: action.payload,
        };
    default:
        return state;
    }
};
