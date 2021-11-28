import React, { useRef, useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import InstagramLogin from 'react-native-instagram-login';

import { SharedComponents } from '../../shared';
import { userActions } from '../../entities/user/store';

import helmet from '../../../assets/helmet.png';

export const screen = ({ navigation }) => {
    const instagramLogin = useRef();
    const dispatch = useDispatch();

    const handleOnLogInPress = useCallback(() => {
        instagramLogin.current?.show();
    }, [instagramLogin]);

    // eslint-disable-next-line camelcase
    const handleOnLogInSuccess = useCallback(async ({ user_id, access_token }) => {
        await dispatch(userActions.setUser(String(user_id), access_token));
        navigation.replace('Profile', { id: String(user_id) });
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.content}>
                <Image source={helmet} style={{ width: 145, height: 145 }} />
                <SharedComponents.UI.AppText style={styles.text}>
                    Здесь должен быть мотивирующий текст,
                    который расскажет тебе, почему лучше залогиниться (через instagram).
                    Но старшие сказали, что темка стрельнет инфа 100%, поэтому обойдемся без него.
                </SharedComponents.UI.AppText>
                <SharedComponents.UI.AppButton text="НАВЕСТИ СУЕТУ " onPress={handleOnLogInPress} />
                <InstagramLogin
                    ref={instagramLogin}
                    appId="146016127708920"
                    appSecret="854cf0fac73f1e53e952d26747577344"
                    redirectUrl="https://socialsizzle.heroku.com/auth/"
                    scopes={['user_profile', 'user_media']}
                    onLoginSuccess={handleOnLogInSuccess}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '75%',
        paddingTop: 100,
    },
    text: {
        fontFamily: 'centurygothic',
        fontWeight: '200',
        textAlign: 'center',
        marginVertical: 30,
        fontSize: 18,
        alignSelf: 'flex-start',
        color: 'white',
    },
});
