import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const screen = () => (
    <View style={styles.center}>
        <Text>Это лучшее приложение для личных заметок.</Text>
        <Text>
            Версия приложения
            {' '}
            <Text style={styles.version}>1.0.0</Text>
        </Text>
    </View>
);

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    version: {
        fontFamily: 'open-bold',
    },
});
