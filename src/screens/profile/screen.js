import React, { useLayoutEffect } from 'react';
import {
    View, StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import { Profile } from './Profile';

import { SharedComponents } from '../../shared';

import { getUser } from '../../shared/store/selectors/users';

export const screen = ({ navigation, route }) => {
    const userData = useSelector(getUser(route.params.id));

    useLayoutEffect(() => {
        if (userData) {
            navigation.setOptions({
                title: userData.username.toUpperCase(),
            });
        }
    }, [navigation, userData]);

    return (
        <View style={styles.center}>
            {userData ? (
                <Profile userId={route.params.id} userData={userData} navigation={navigation} />
            ) : (
                <SharedComponents.UI.AppButton visible text=" " />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
    },
});
