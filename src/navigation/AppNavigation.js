import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, DefaultTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EventsScreen from '../screens/EventsScreen';
import EventScreen from '../screens/EventScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';

import Auth from '../components/Auth';

import THEME from '../theme';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: THEME.MAIN_COLOR,
        border: THEME.GRAY,
    },
};

const getOptions = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Map';
    const params = {
        Map: {
            title: 'Карта событий',
            headerShown: true,
        },
        Event: {
            headerShown: false,
        },
    };

    return params[routeName];
};

const Events = () => (
    <Stack.Navigator>
        <Stack.Screen name="Map" component={EventsScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="Event"
            component={EventScreen}
            options={({ route }) => ({
                headerTitle: route.params.name,
                // headerBackVisible: false,
            })}
        />
    </Stack.Navigator>
);

export default () => (
    <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator screenOptions={(({ navigation }) => ({
            headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
            headerStyle: { backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff' },
            headerRight: () => (
                <Auth onAvatarClick={() => navigation.navigate('Profile')} />
            ),
            headerRightContainerStyle: { right: 15 },
            drawerActiveTintColor: THEME.MAIN_COLOR,
            drawerLabelStyle: {
                fontFamily: 'open-bold',
                width: '100%',
            },
        }))}
        >
            <Drawer.Screen
                name="Events"
                options={({ route }) => getOptions(route)}
                component={Events}
            />
            <Drawer.Screen name="Profile" options={{ title: 'Профиль' }} component={ProfileScreen} />
            <Drawer.Screen name="About" options={{ title: 'О приложении' }} component={AboutScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
);
