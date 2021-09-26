import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => (
    <View style={styles.center}>
        <Text>Это лучшее приложение для личных заметок.</Text>
        <Text>
            Версия приложения
            {' '}
            <Text style={styles.version}>1.0.0</Text>
        </Text>
    </View>
);

export default AboutScreen;

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
