import React from 'react';
import {
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';

export const Touchable = ({ children, onPress }) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <Wrapper activeOpacity={0.7} onPress={onPress}>{children}</Wrapper>
    );
};
