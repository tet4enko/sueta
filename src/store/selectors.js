import { calculateEventRegion } from '../helpers/location';

export const getCurrentEventMeta = (state) => {
    if (!state.events.eventId) {
        return null;
    }

    const result = state.events.events.find((item) => item.id === state.events.eventId);
    result.region = calculateEventRegion(result);
    return result;
};
export const getCurrentEventNavData = (state) => {
    if (!state.events.eventId) {
        return null;
    }

    return state.events.eventNavData;
};
export const getCurrentEventRaces = (state) => {
    if (!state.events.eventId) {
        return null;
    }

    return state.events.eventRaces;
};
export const getCurrentEventTopThreeRaces = (state) => {
    const { eventId, eventRaces } = state.events;
    if (!eventId || !eventRaces) {
        return null;
    }

    return Object.values(
        eventRaces.reduce((acc, race) => {
            if (!acc[race.user] || acc[race.user].time > race.time) {
                acc[race.user] = race;
            }

            return acc;
        }, {}),
    )
        .sort((a, b) => a.time - b.time)
        .slice(0, 3);
};

export const getCurrentEventUserStats = (state) => {
    const { currentUserId } = state.user;

    if (!currentUserId) {
        return null;
    }

    const { eventId, eventRaces } = state.events;
    if (!eventId || !eventRaces) {
        return null;
    }

    const bestRaces = Object.values(
        eventRaces.reduce((acc, race) => {
            if (!acc[race.user] || acc[race.user].time > race.time) {
                acc[race.user] = race;
            }

            return acc;
        }, {}),
    )
        .sort((a, b) => a.time - b.time);

    let time = null;
    const position = bestRaces.findIndex((race) => {
        const isCurrentUserRace = race.user === currentUserId;
        if (isCurrentUserRace) {
            time = race.time;
        }
        return isCurrentUserRace;
    }) + 1;

    return { time, position };
};

export const getEvents = (state) => state.events;

export const getLocation = (state) => state.location;

export const getTrafficLightColor = (state) => state.race.ui.trafficLightColor;
export const getTrafficLightVisibility = (state) => state.race.ui.isTrafficLightVisible;
export const getStartTime = (state) => state.race.startTime;
export const getFinishTime = (state) => state.race.finishTime;
export const getRaceCurrentRaceCard = (state) => state.race.ui.raceCard;

export const getUserById = (userId) => (state) => state.user.users[userId] || null;
export const getCurrentUser = (state) => state.user.currentUserId;
