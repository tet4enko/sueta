import * as React from 'react';
import { StyleSheet } from 'react-native';

import { SharedComponents } from '../../shared';

export const HeaderLeft = () => (
    <SharedComponents.UI.AppText style={style.default}>SUETA </SharedComponents.UI.AppText>
);

const style = StyleSheet.create({
    default: {
        fontSize: 30,
        color: 'white',
    },
});
