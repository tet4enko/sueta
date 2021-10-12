import {
    SET_TRAFFIC_LIGHT_VISIBILITY,
    SET_TRAFFIC_LIGHT_COLOR,
    SET_START_TIME,
    SET_FINISH_TIME,
    SET_CURRENT_RACE_CARD,
} from '../types';

const initialState = {
    ui: {
        isTrafficLightVisible: false,
        trafficLightColor: 'red',
        raceCard: null,
    },
    startTime: null,
    finishTime: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_TRAFFIC_LIGHT_VISIBILITY:
        return {
            ...state,
            ui: {
                ...state.ui,
                isTrafficLightVisible: action.payload,
            },
        };
    case SET_TRAFFIC_LIGHT_COLOR:
        return {
            ...state,
            ui: {
                ...state.ui,
                trafficLightColor: action.payload,
            },
        };
    case SET_START_TIME:
        return {
            ...state,
            startTime: action.payload,
        };
    case SET_FINISH_TIME:
        return {
            ...state,
            finishTime: action.payload,
        };
    case SET_CURRENT_RACE_CARD:
        return {
            ...state,
            ui: {
                ...state.ui,
                raceCard: action.payload,
            },
        };
    default:
        return state;
    }
};
