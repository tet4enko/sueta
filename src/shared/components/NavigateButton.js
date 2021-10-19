import React, {
    useEffect, useState, useCallback, useRef,
} from 'react';
import {
    StyleSheet,
    View,
    Linking,
    Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from './ui/AppButton';
import { AppText } from './ui/AppText';

const NavigateButton = ({
    latitude, longitude, style, text = 'Построить маршрут до старта',
}) => {
    const { colors } = useTheme();
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
            <AppButton onPress={handleOnPress} color="#fff">
                <Ionicons name="navigate" size={24} style={{ color: colors.text }} />
                <AppText style={{ ...styles.buttonText, color: colors.text }}>{text}</AppText>
            </AppButton>
        </View>
    );
};

export default NavigateButton;

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        paddingLeft: 10,
    },
});
