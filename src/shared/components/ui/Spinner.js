import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LottieLoader } from 'lottie-loader-react-native';

import loader from './loader.json';
import { AppText } from './AppText';

export const Spinner = ({ visible, text }) => (
    <View style={styles.default}>
        <LottieLoader
            visible={visible}
            source={loader}
            animationStyle={styles.lottie}
            speed={1}
        />
        <AppText style={styles.text}>
            {text || 'Моментик...'}
        </AppText>
    </View>
);

const styles = StyleSheet.create({
    default: {
        display: 'flex',
        alignItems: 'center',
    },
    lottie: { width: 100, height: 100 },
    text: {
        color: 'white', fontFamily: 'centurygothic', fontSize: 26, top: 10,
    },
});
