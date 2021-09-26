import React, {
    useRef,
    useCallback,
    useState,
    useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    View,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import InstagramLogin from 'react-native-instagram-login';
// import CookieManager from '@react-native-community/cookies';
import { useTheme } from '@react-navigation/native';

import { Entypo, EvilIcons } from '@expo/vector-icons';

import { setCurrentUser } from '../store/actions/user';
import { getUserById } from '../store/selectors';

const Auth = ({ onAvatarClick }) => {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    const instagramLogin = useRef();
    const [igAuthData, setIgAuthData] = useState(null);
    const userData = useSelector(getUserById(igAuthData ? igAuthData.user_id : null));

    const handleOnLoginSuccess = useCallback((data) => setIgAuthData(data), [setIgAuthData]);

    const handleOnLoginPress = useCallback(() => {
        instagramLogin.current?.show();
    }, [instagramLogin]);

    useEffect(() => {
        if (igAuthData) {
            dispatch(setCurrentUser(String(igAuthData.user_id), igAuthData.access_token));
        }
    }, [igAuthData]);

    return (
        <View>
            {userData ? (
                <Wrapper activeOpacity={0.7} onPress={onAvatarClick}>
                    <EvilIcons name="user" size={36} style={{ color: colors.primary }} />
                </Wrapper>
            ) : (
                <>
                    <Wrapper activeOpacity={0.7} onPress={handleOnLoginPress}>
                        <Entypo name="login" size={25} color={colors.primary} />
                    </Wrapper>
                    <InstagramLogin
                        ref={instagramLogin}
                        appId="146016127708920"
                        appSecret="854cf0fac73f1e53e952d26747577344"
                        redirectUrl="https://socialsizzle.heroku.com/auth/"
                        scopes={['user_profile', 'user_media']}
                        onLoginSuccess={handleOnLoginSuccess}
                    />
                </>
            )}
        </View>
    );
};

export default Auth;
