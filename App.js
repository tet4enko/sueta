import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { AppComponents } from './src/app';
import store from './src/app/store';

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
            <AppComponents.Navigation />
        </Provider>
    );
}
