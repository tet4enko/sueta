import {
    Linking,
} from 'react-native';

export const openUserInInstagram = async (login) => {
    const url = `instagram://user?username=${login}`;

    Linking.openURL(url);
};
