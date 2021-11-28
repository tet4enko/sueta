import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { AppText } from './AppText';
import { Touchable } from './Touchable';

export const AppButton = ({
    children, onPress, isDisabled, text, style, color = 'white', gradientColors = ['#1d1f59', '#3f3185'],
}) => {
    const content = (
        <View style={{ ...styles.button, ...style }}>
            <LinearGradient
                colors={gradientColors}
                start={{
                    x: 0,
                    y: 0,
                }}
                end={{
                    x: 1,
                    y: 1,
                }}
                style={{ ...styles.box, borderColor: color }}
            >
                {text ? (
                    <AppText style={{ ...styles.buttonText, color }}>
                        {text}
                    </AppText>
                ) : children}
            </LinearGradient>
        </View>
    );

    if (isDisabled) {
        return content;
    }

    return (
        <Touchable onPress={onPress} activeOpacity={0.7}>
            {content}
        </Touchable>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
    },
});
