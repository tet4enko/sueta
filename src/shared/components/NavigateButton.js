import React, {
    useEffect, useState, useCallback, useRef,
} from 'react';
import {
    View,
    Linking,
    Platform,
} from 'react-native';
import { AppButton } from './ui/AppButton';

export const NavigateButton = ({
    latitude, longitude, style, text = 'Построить маршрут',
}) => {
    const yandexUrl = `https://yandex.ru/maps/?rtext=~${latitude},${longitude}&rtt=auto`;
    const googleUrl = `http://maps.google.com/maps?saddr=&daddr=${latitude},${longitude}`;
    const appleUrl = `http://maps.apple.com/?ll=${latitude},${longitude}`;

    const actualOptions = Platform.OS === 'ios' ? [yandexUrl, googleUrl, appleUrl] : [yandexUrl, googleUrl];

    const [urlToView, setUrlToView] = useState('');

    const mountedRef = useRef(true);

    useEffect(() => () => {
        mountedRef.current = false;
    });

    useEffect(() => {
        const getSupport = async () => {
            const canOpenInfo = await Promise.all(actualOptions.map((option) => Linking.canOpenURL(option)));

            if (mountedRef.current) {
                setUrlToView(actualOptions[canOpenInfo.findIndex(Boolean)]);
            }
        };

        getSupport();
    }, [actualOptions]);

    const handleOnPress = useCallback(() => Linking.openURL(urlToView), [urlToView]);

    return (
        <View style={style}>
            <AppButton onPress={handleOnPress} color="#fff" text={text} />
        </View>
    );
};
