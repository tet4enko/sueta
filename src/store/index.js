import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { locationReducer } from './reducers/location';
import { eventsReducer } from './reducers/events';
import { raceReducer } from './reducers/race';
import { userReducer } from './reducers/user';

const rootReducer = combineReducers({
    location: locationReducer,
    events: eventsReducer,
    race: raceReducer,
    user: userReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
