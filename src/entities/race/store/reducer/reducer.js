import {
    SET_TRAFFIC_LIGHT_VISIBILITY,
    SET_TRAFFIC_LIGHT_COLOR,
    SET_START_TIME,
    SET_FINISH_TIME,
    SET_RESULTS_DATA,
    SET_IS_RESULTS_READY,
} from '../types';

const initialState = {
    ui: {
        isTrafficLightVisible: false,
        trafficLightColor: 'red',
        isResultsReady: false,
    },
    startTime: null,
    finishTime: null,
    resultsData: null,
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
    case SET_IS_RESULTS_READY:
        return {
            ...state,
            ui: {
                ...state.ui,
                isResultsReady: action.payload,
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
    case SET_RESULTS_DATA:
        return {
            ...state,
            resultsData: action.payload,
        };
    default:
        return state;
    }
};
