import React from 'react';
import { StyleSheet } from 'react-native';

import { AppText } from './AppText';

export const Finish = () => (
    <AppText style={styles.default}>ФИНИШ 🏁</AppText>
);

const styles = StyleSheet.create({
    default: {
        fontSize: 50,
        color: '#fff',
    },
});
