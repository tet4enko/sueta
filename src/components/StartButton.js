import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    StyleSheet,
    View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppButton } from './ui/AppButton';
import { AppText } from './ui/AppText';

import { getLocation } from '../store/selectors';
import { eventSelectors } from '../entities/event/store';
import { calcCrow } from '../helpers/location';

import { LOCATION_RADIUS } from '../constants';

const StartButton = ({ style, onPress, startText = 'Перейти в событие!' }) => {
    const { location } = useSelector(getLocation);
    const eventMeta = useSelector(eventSelectors.getCurrentEventMeta);

    const [distance, setDistance] = useState(
        calcCrow(location.latitude, location.longitude, eventMeta.startLatitude, eventMeta.startLongitude),
    );
    const [isDisabled, setIsDisabled] = useState(distance > LOCATION_RADIUS);

    useEffect(() => {
        setDistance(calcCrow(location.latitude, location.longitude, eventMeta.startLatitude, eventMeta.startLongitude));
    }, [location.latitude, location.longitude, eventMeta.startLatitude, eventMeta.startLongitude]);

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
