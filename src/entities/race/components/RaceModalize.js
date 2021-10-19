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

import { AppTextBold } from '../../../shared/components/ui/AppTextBold';
import { AppText } from '../../../shared/components/ui/AppText';
import { AppButton } from '../../../shared/components/ui/AppButton';

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
                <AppTextBold style={{ ...styles.title, color: colors.primary }}>Данные заезда</AppTextBold>
                <View style={styles.item}>
                    <MaterialCommunityIcons name="racing-helmet" size={33} style={styles.itemIcon} />
                    <AppTextBold style={styles.itemLabel}>Участник: </AppTextBold>
                    <AppText style={styles.itemContent}>{user}</AppText>
                </View>
                <View style={styles.item}>
                    <Ionicons name="stopwatch" size={33} style={styles.itemIcon} />
                    <AppTextBold style={styles.itemLabel}>Время: </AppTextBold>
                    <AppText style={styles.itemContent}>{prettyMilliseconds(time)}</AppText>
                </View>
                <View style={styles.item}>
                    <MaterialIcons name="grade" size={33} style={styles.itemIcon} />
                    <AppTextBold style={styles.itemLabel}>Позиция: </AppTextBold>
                    <AppText style={styles.itemContent}>
                        {position}
                        {position === 1 ? ' 👑' : ''}
                    </AppText>
                    {withUpgrage && (
                        <AntDesign name="arrowup" size={24} style={styles.upgradeIcon} />
                    )}
                </View>
                <View style={styles.item}>
                    <Ionicons name="car-sport" size={33} style={styles.itemIcon} />
                    <AppTextBold style={styles.itemLabel}>Машина: </AppTextBold>
                    <AppText style={styles.itemContent}>{car}</AppText>
                </View>
                <View style={styles.okButtonWrapper}>
                    <AppButton onPress={onPressBack}>
                        <AntDesign name="check" size={32} style={{ color: '#fff' }} />
                        <AppText style={{ ...styles.buttonText, color: '#fff' }}>OK </AppText>
                    </AppButton>
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
