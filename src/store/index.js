import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { locationReducer } from './reducers/location';
import { eventReducer } from '../entities/event/store';
import { eventsReducer } from '../entities/events/store';
import { raceReducer } from '../entities/race/store';
import { userReducer } from './reducers/user';

const rootReducer = combineReducers({
    location: locationReducer,
    events: eventsReducer,
    event: eventReducer,
    race: raceReducer,
    user: userReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
