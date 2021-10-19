import * as Font from 'expo-font';
// import * as Location from 'expo-location';
import openBold from '../../../assets/fonts/OpenSans-Bold.ttf';
import openRegular from '../../../assets/fonts/OpenSans-Regular.ttf';
import robotoBold from '../../../assets/fonts/Roboto-Bold.ttf';
import robotoRegular from '../../../assets/fonts/Roboto-Regular.ttf';

export const Bootstrap = async () => {
    const results = await Promise.all([
        Font.loadAsync({
            'open-bold': openBold,
            'open-regular': openRegular,
            'roboto-bold': robotoBold,
            'roboto-regular': robotoRegular,
        }),
        // (async () => {
        //     const { status } = await Location.requestForegroundPermissionsAsync();
        //     if (status !== 'granted') {
        //         return;
        //     }

        //     const location = await Location.getCurrentPositionAsync({});
        //     // eslint-disable-next-line consistent-return
        //     return location;
        // })(),
    ]);

    return results;
};
