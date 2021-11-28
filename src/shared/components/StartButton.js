import React from 'react';

import { useSelector } from 'react-redux';
import { AppButton } from './ui/AppButton';
import { NavigateButton } from './NavigateButton';

import {
    getLocation,
} from '../store/selectors/location';

import { useIsOnLocation } from '../model/hooks';

export const StartButton = ({
    style,
    onPress,
    startText = ' Перейти в событие ',
    eventLatitude,
    eventLongitude,
    isAction,
}) => {
    const { location } = useSelector(getLocation);
    const isEnabled = useIsOnLocation(eventLatitude, eventLongitude, location.latitude, location.longitude);

    const text = isEnabled ? startText : ' Машрут до старта ';

    return (
        <>
            {isEnabled && (
                <AppButton style={style} onPress={onPress} text={` ${text} `} color={isAction ? '#ff0088' : 'white'} />
            )}
            {!isEnabled && (
                <NavigateButton style={style} latitude={eventLatitude} longitude={eventLongitude} text={text} />
            )}
        </>
    );
};
