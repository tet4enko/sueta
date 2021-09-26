import React from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppButton } from './ui/AppButton';
import { AppText } from './ui/AppText';

const CancelButton = ({
    buttonText = 'Отмена',
    alertTitle,
    alertText,
    alertCancelText,
    alertOkText,
    onPress,
}) => {
    const { colors } = useTheme();

    const createTwoButtonAlert = () => Alert.alert(
        alertTitle,
        alertText,
        [
            {
                text: alertCancelText,
                style: 'cancel',
            },
            { text: alertOkText, onPress },
        ],
    );

    return (
        <AppButton onPress={createTwoButtonAlert} color="#fff">
            <MaterialIcons name="cancel" size={24} style={{ color: colors.text }} />
            <AppText style={{ ...styles.buttonText, color: colors.text }}>{buttonText}</AppText>
        </AppButton>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        paddingLeft: 10,
        color: '#fff',
    },
});

export default CancelButton;
