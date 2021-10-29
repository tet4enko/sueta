import React, { useCallback } from 'react';
import {
    View, StyleSheet, Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import { SharedComponents } from '../../shared';

import { userSelectors } from '../../entities/user/store';

const AVATAR_SIZE = 145;

export const screen = () => {
    const { colors } = useTheme();
    const currentUser = useSelector(userSelectors.getCurrentUser);
    const currentUserData = useSelector(userSelectors.getUserById(currentUser));

    const handleLoginPress = useCallback(() => Linking.openURL(
        `instagram://user?username=${currentUserData.username}`,
    ), [currentUserData]);

    return (
        <View style={styles.center}>
            {currentUserData ? (
                <View style={styles.profile}>
                    <Entypo name="instagram" size={AVATAR_SIZE} />
                    <SharedComponents.UI.Touchable onPress={handleLoginPress}>
                        <SharedComponents.UI.AppTextBold style={{ ...styles.profileTextTitle }}>
                            {`@${currentUserData.username}`}
                        </SharedComponents.UI.AppTextBold>
                    </SharedComponents.UI.Touchable>
                </View>
            ) : (
                <View style={styles.anonymus}>
                    <MaterialCommunityIcons name="racing-helmet" size={AVATAR_SIZE} color={colors.primary} />
                    <SharedComponents.UI.AppTextBold style={styles.anonymusTextTitle}>
                        Вы не авторизованы :(
                    </SharedComponents.UI.AppTextBold>
                    <SharedComponents.UI.AppText style={styles.anonymusText}>
                        Это необходимо, чтобы Вы могли соревноваться с другими участниками,
                        и Ваши результаты сохранялись в системе.
                    </SharedComponents.UI.AppText>
                    <SharedComponents.UI.AppText style={styles.anonymusText}>
                        Для этого, нажмите на иконку в правом верхнем углу ☝
                    </SharedComponents.UI.AppText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100,
    },
    anonymus: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '75%',
    },
    anonymusTextTitle: {
        marginTop: 20,
        fontSize: 20,
    },
    anonymusText: {
        marginTop: 10,
        fontSize: 18,
        alignSelf: 'flex-start',
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: 100,
    },
    profile: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '75%',
    },
    profileTextTitle: {
        marginTop: 20,
        fontSize: 20,
    },
});
