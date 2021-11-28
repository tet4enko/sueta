import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EventsScreen } from '../../screens/events';
import { EventScreen } from '../../screens/event';
import { ProfileScreen } from '../../screens/profile';
// import { AboutScreen } from '../../screens/about';
import { AddCarScreen } from '../../screens/addCar';
import { AnonymusScreen } from '../../screens/anonymus';

import { themeLib } from '../../shared/lib';

import { HeaderLeft } from './HeaderLeft';
import { HeaderRight } from './HeaderRight';
import { HeaderBack } from './HeaderBack';
// import { color } from 'react-native-reanimated';

// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: themeLib.MAIN_COLOR,
        border: themeLib.GRAY,
    },
};

export const Navigation = () => (
    <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={() => ({
            headerStyle: { backgroundColor: 'transparent' },
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'none',
            title: '',
            headerTitleStyle: {
                fontSize: 18, fontFamily: 'centurygothicBold', fontWeight: '700', color: 'white',
            },
        })}
        >
            <Stack.Screen
                name="Events"
                component={EventsScreen}
                options={({ navigation }) => ({
                    headerLeft: HeaderLeft,
                    headerRight: () => (
                        <HeaderRight onPress={(currentUserId) => {
                            if (currentUserId) {
                                navigation.navigate('Profile', { id: currentUserId });
                            } else {
                                navigation.navigate('Anonymus');
                            }
                        }}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="Anonymus"
                component={AnonymusScreen}
                options={({ navigation }) => ({
                    headerBackVisible: false,
                    headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
                })}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation }) => ({
                    headerBackVisible: false,
                    headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
                })}
            />
            <Stack.Screen
                name="AddCar"
                component={AddCarScreen}
                options={({ navigation }) => ({
                    headerBackVisible: false,
                    headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
                    title: 'ДОБАВИТЬ МАШИНУ',
                })}
            />
            <Stack.Screen
                name="Event"
                component={EventScreen}
                options={({ navigation }) => ({
                    headerBackVisible: false,
                    headerLeft: () => <HeaderBack onPress={() => navigation.goBack()} />,
                    headerRight: () => (
                        <HeaderRight onPress={(currentUserId) => {
                            if (currentUserId) {
                                navigation.navigate('Profile', { id: currentUserId });
                            } else {
                                navigation.navigate('Anonymus');
                            }
                        }}
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

// const getOptions = (route) => {
//     const routeName = getFocusedRouteNameFromRoute(route) ?? 'Map';
//     const params = {
//         Map: {
//             title: 'Карта событий',
//             headerShown: true,
//         },
//         Event: {
//             headerShown: false,
//         },
//     };

//     return params[routeName];
// };

// const Events = () => (
//     <Stack.Navigator>
//         <Stack.Screen name="Map" component={EventsScreen} options={{ headerShown: false }} />
//         <Stack.Screen
//             name="Event"
//             component={EventScreen}
//             options={({ route }) => ({
//                 headerTitle: route.params.name,
//                 // headerBackVisible: false,
//             })}
//         />
//     </Stack.Navigator>
// );

// export const Navigation = () => (
//     <NavigationContainer theme={MyTheme}>
//         <Drawer.Navigator screenOptions={(({ navigation }) => ({
//             headerTintColor: Platform.OS === 'android' ? '#fff' : themeLib.MAIN_COLOR,
//             headerStyle: { backgroundColor: Platform.OS === 'android' ? themeLib.MAIN_COLOR : '#fff' },
//             headerRight: () => (
//                 <Auth onAvatarClick={() => navigation.navigate('Profile')} />
//             ),
//             headerRightContainerStyle: { right: 15 },
//             drawerActiveTintColor: themeLib.MAIN_COLOR,
//             drawerLabelStyle: {
//                 fontFamily: 'open-bold',
//                 width: '100%',
//             },
//         }))}
//         >
//             <Drawer.Screen
//                 name="Events"
//                 options={({ route }) => getOptions(route)}
//                 component={Events}
//             />
//             <Drawer.Screen name="Profile" options={{ title: 'Профиль' }} component={ProfileScreen} />
//             <Drawer.Screen name="About" options={{ title: 'О приложении' }} component={AboutScreen} />
//         </Drawer.Navigator>
//     </NavigationContainer>
// );
