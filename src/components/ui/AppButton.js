import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

export const AppButton = ({
    children, onPress, color, isDisabled,
}) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const { colors } = useTheme();

    const content = (
        <View style={{ ...styles.button, backgroundColor: color || colors.primary }}>
            {children}
        </View>
    );

    if (isDisabled) {
        return content;
    }

    return (
        <Wrapper onPress={onPress} activeOpacity={0.7}>
            {content}
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
});
