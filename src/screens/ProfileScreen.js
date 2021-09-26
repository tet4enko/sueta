import React, { useCallback } from 'react';
import {
    View, StyleSheet, Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import { AppText } from '../components/ui/AppText';
import { AppTextBold } from '../components/ui/AppTextBold';

import { getUserById, getCurrentUser } from '../store/selectors';

import Touchable from '../components/ui/Touchable';

const AVATAR_SIZE = 145;

const ProfileScreen = () => {
    const { colors } = useTheme();
    const currentUser = useSelector(getCurrentUser);
    const currentUserData = useSelector(getUserById(currentUser));

    const handleLoginPress = useCallback(() => Linking.openURL(
        `instagram://user?username=${currentUserData.username}`,
    ), [currentUserData]);

    return (
        <View style={styles.center}>
            {currentUserData ? (
                <View style={styles.profile}>
                    <Entypo name="instagram" size={AVATAR_SIZE} />
                    <Touchable onPress={handleLoginPress}>
                        <AppTextBold style={{ ...styles.profileTextTitle }}>
                            {`@${currentUserData.username}`}
                        </AppTextBold>
                    </Touchable>
                </View>
            ) : (
                <View style={styles.anonymus}>
                    <MaterialCommunityIcons name="racing-helmet" size={AVATAR_SIZE} color={colors.primary} />
                    <AppTextBold style={styles.anonymusTextTitle}>Вы не авторизованы :(</AppTextBold>
                    <AppText style={styles.anonymusText}>
                        Это необходимо, чтобы Вы могли соревноваться с другими участниками,
                        и Ваши результаты сохранялись в системе.
                    </AppText>
                    <AppText style={styles.anonymusText}>
                        Для этого, нажмите на иконку в правом верхнем углу ☝
                    </AppText>
                </View>
            )}
        </View>
    );
};

export default ProfileScreen;

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
