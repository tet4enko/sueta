import React, { forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';
import {
    View,
    StyleSheet,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
    Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign,
} from '@expo/vector-icons';

import prettyMilliseconds from 'pretty-ms';

import { SharedComponents } from '../../../shared';

export const RaceModalize = forwardRef(({
    race: { user, car, time },
    position: { position, withUpgrage },
    onPressBack,
}, ref) => {
    const { colors } = useTheme();
    return (
        <Modalize
            adjustToContentHeight
            ref={ref}
            // onClosed={onClosed}
            withOverlay={false}
        >
            <View style={styles.wrap}>
                <SharedComponents.UI.AppTextBold style={{ ...styles.title, color: colors.primary }}>
                    Данные заезда
                </SharedComponents.UI.AppTextBold>
                <View style={styles.item}>
                    <MaterialCommunityIcons name="racing-helmet" size={33} style={styles.itemIcon} />
                    <SharedComponents.UI.AppTextBold style={styles.itemLabel}>
                        Участник:
                    </SharedComponents.UI.AppTextBold>
                    <SharedComponents.UI.AppText style={styles.itemContent}>
                        {user}
                    </SharedComponents.UI.AppText>
                </View>
                <View style={styles.item}>
                    <Ionicons name="stopwatch" size={33} style={styles.itemIcon} />
                    <SharedComponents.UI.AppTextBold style={styles.itemLabel}>Время: </SharedComponents.UI.AppTextBold>
                    <SharedComponents.UI.AppText style={styles.itemContent}>
                        {prettyMilliseconds(time)}
                    </SharedComponents.UI.AppText>
                </View>
                <View style={styles.item}>
                    <MaterialIcons name="grade" size={33} style={styles.itemIcon} />
                    <SharedComponents.UI.AppTextBold style={styles.itemLabel}>
                        Позиция:
                    </SharedComponents.UI.AppTextBold>
                    <SharedComponents.UI.AppText style={styles.itemContent}>
                        {position}
                        {position === 1 ? ' 👑' : ''}
                    </SharedComponents.UI.AppText>
                    {withUpgrage && (
                        <AntDesign name="arrowup" size={24} style={styles.upgradeIcon} />
                    )}
                </View>
                <View style={styles.item}>
                    <Ionicons name="car-sport" size={33} style={styles.itemIcon} />
                    <SharedComponents.UI.AppTextBold style={styles.itemLabel}>Машина: </SharedComponents.UI.AppTextBold>
                    <SharedComponents.UI.AppText style={styles.itemContent}>{car}</SharedComponents.UI.AppText>
                </View>
                <View style={styles.okButtonWrapper}>
                    <SharedComponents.UI.AppButton onPress={onPressBack}>
                        <AntDesign name="check" size={32} style={{ color: '#fff' }} />
                        <SharedComponents.UI.AppText style={{ ...styles.buttonText, color: '#fff' }}>OK </SharedComponents.UI.AppText>
                    </SharedComponents.UI.AppButton>
                </View>
            </View>
        </Modalize>
    );
});

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 35,
        height: 400,
    },
    title: {
        fontFamily: 'open-bold',
        fontSize: 40,
        paddingBottom: 20,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    itemLabel: {
        fontSize: 25,
    },
    itemContent: {
        fontSize: 25,
    },
    itemIcon: {
        marginRight: 10,
    },
    buttonText: {
        fontSize: 30,
        paddingLeft: 10,
    },
    okButtonWrapper: {
        marginTop: 20,
    },
    upgradeIcon: {
        color: 'green',
        marginLeft: 'auto',
    },
});
