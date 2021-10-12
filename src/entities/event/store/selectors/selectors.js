import { calculateEventRegion } from '../../../../helpers/location';

export const getCurrentEventId = (state) => {
    if (!state.event.id) {
        return null;
    }

    return state.event.id;
};
export const getCurrentEventMeta = (state) => {
    if (!state.event.id) {
        return null;
    }

    const result = state.events.events.find((item) => item.id === state.event.id);
    result.region = calculateEventRegion(result);
    return result;
};
export const getCurrentEventNavData = (state) => {
    if (!state.event.id) {
        return null;
    }

    return state.event.navData;
};
export const getCurrentEventRaces = (state) => {
    if (!state.event.id) {
        return null;
    }

    return state.event.races;
};
export const getCurrentEventTopThreeRaces = (state) => {
    const { id, races } = state.event;
    if (!id || !races) {
        return null;
    }

    return Object.values(
        races.reduce((acc, race) => {
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

    const { id, races } = state.event;
    if (!id || !races) {
        return null;
    }

    const bestRaces = Object.values(
        races.reduce((acc, race) => {
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
