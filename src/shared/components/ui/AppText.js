import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const AppText = ({ style, children }) => (
    <Text style={StyleSheet.compose(styles.default, style)}>{children}</Text>
);

const styles = StyleSheet.create({
    default: {
        fontFamily: 'nfs',
    },
});
