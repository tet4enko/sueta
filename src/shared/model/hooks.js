import { useMemo } from 'react';

import { calcCrow } from '../lib/location';
import { constants } from '../lib/constants';

export const useIsOnLocation = (
    eventLatitude,
    eventLongitude,
    userLatitude,
    userLongitude,
) => {
    const result = useMemo(() => {
        const distance = calcCrow(userLatitude, userLongitude, eventLatitude, eventLongitude);

        return distance <= constants.LOCATION_RADIUS;
    }, [
        eventLatitude,
        eventLongitude,
        userLatitude,
        userLongitude,
    ]);

    return result;
};
