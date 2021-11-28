import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { ImageBackground, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { AppComponents } from './src/app';
import store from './src/app/store';

import background from './assets/background.png';

export default function App() {
    const [isReady, setIsReady] = useState(false);

    if (!isReady) {
        return (
            <AppLoading
                startAsync={AppComponents.Bootstrap}
                onFinish={() => setIsReady(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    return (
        <Provider store={store}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <AppComponents.Navigation />
            </ImageBackground>
        </Provider>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
});
