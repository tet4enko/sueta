import * as React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Image } from 'react-native';

import { SharedComponents } from '../../shared';

import { userSelectors } from '../../entities/user/store';

import helmet from '../../../assets/helmet.png';

export const HeaderRight = ({ onPress }) => {
    const currentUserId = useSelector(userSelectors.getCurrentUserId);

    const handlePress = React.useCallback(
        () => onPress(currentUserId),
        [currentUserId],
    );

    return (
        <SharedComponents.UI.Touchable onPress={handlePress}>
            <Image source={helmet} style={style.icon} />
        </SharedComponents.UI.Touchable>
    );
};

const style = StyleSheet.create({
    icon: {
        width: 35,
        height: 35,
    },
});
