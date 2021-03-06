import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { locationReducer } from '../../shared/store/reducers/location';
import { eventReducer } from '../../entities/event/store';
import { eventsReducer } from '../../entities/events/store';
import { raceReducer } from '../../entities/race/store';
import { userReducer } from '../../entities/user/store';
import { usersReducer } from '../../shared/store/reducers/users';

const rootReducer = combineReducers({
    location: locationReducer,
    events: eventsReducer,
    event: eventReducer,
    race: raceReducer,
    user: userReducer,
    users: usersReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
