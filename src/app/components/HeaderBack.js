import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import backIcon from '../../../assets/back.png';

import { SharedComponents } from '../../shared';

export const HeaderBack = ({ onPress }) => (
    <SharedComponents.UI.Touchable onPress={onPress}>
        <Image source={backIcon} style={style.default} />
    </SharedComponents.UI.Touchable>
);

const style = StyleSheet.create({
    default: {
        height: 32,
        width: 32,
    },
});
