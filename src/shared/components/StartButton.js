import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppButton } from './ui/AppButton';
import { AppText } from './ui/AppText';

import { calcCrow } from '../../helpers/location';

import { LOCATION_RADIUS } from '../../constants';

const StartButton = ({
    style,
    onPress,
    startText = 'Перейти в событие!',
    eventLatitude,
    eventLongitude,
    userLatitude,
    userLongitude,
}) => {
    const [distance, setDistance] = useState(
        calcCrow(userLatitude, userLongitude, eventLatitude, eventLongitude),
    );
    const [isDisabled, setIsDisabled] = useState(distance > LOCATION_RADIUS);

    useEffect(() => {
        setDistance(calcCrow(userLatitude, userLongitude, eventLatitude, eventLongitude));
    }, [
        eventLatitude,
        eventLongitude,
        userLatitude,
        userLongitude,
    ]);

    useEffect(() => {
        setIsDisabled(distance > LOCATION_RADIUS);
    }, [distance]);

    const text = isDisabled ? `До старта ~ ${distance.toFixed(3) * 1000} м.` : startText;

    return (
        <View style={{ ...style, opacity: isDisabled ? 0.5 : 1 }}>
            <AppButton onPress={onPress} isDisabled={isDisabled}>
                <MaterialCommunityIcons name="racing-helmet" size={24} color="#fff" />
                <AppText style={styles.buttonText}>{text}</AppText>
            </AppButton>
        </View>
    );
};

export default StartButton;

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        paddingLeft: 10,
        color: '#fff',
    },
});
