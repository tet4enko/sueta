import { calculateEventRegion } from '../../../../shared/lib/location';

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
export const getCurrentEventRating = (state) => {
    const { id, races } = state.event;
    if (!id || !races) {
        return null;
    }

    const list = Object.values(
        races.reduce((acc, race) => {
            if (!acc[race.userId] || acc[race.userId].time > race.time) {
                acc[race.userId] = race;
            }

            return acc;
        }, {}),
    )
        .sort((a, b) => a.time - b.time);

    const currentUserPosition = list.findIndex((race) => race.userId === state.user.id) + 1;

    return {
        currentUserPosition,
        list,
    };
};
