import React from 'react';
import { StyleSheet } from 'react-native';

import AnimatedLoader from 'react-native-animated-loader';

import { AppText } from './AppText';

import loader from './loader.json';

export const Loader = ({ visible, text }) => (
    <AnimatedLoader
        source={loader}
        visible={visible}
        overlayColor="rgba(0,0,0,0.75)"
        animationStyle={styles.default}
        speed={1}
    >
        <AppText style={styles.text}>
            {text || 'Моментик...'}
        </AppText>
    </AnimatedLoader>
);

const styles = StyleSheet.create({
    default: {
        width: 100,
        height: 100,
    },
    text: {
        color: 'white', fontFamily: 'centurygothic', fontSize: 26, top: 10,
    },
});
