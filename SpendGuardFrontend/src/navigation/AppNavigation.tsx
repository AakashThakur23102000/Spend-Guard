import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/LoginScreen';
import { NavigationPaths } from '../config/NavigationPaths';
import SplashScreen from '../screens/splash/SplashScreen';
import GlobalQueryClient from '../utils/globalQueryClient';
import { useNavigation } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';

const AppNavigation = () => {
    const Stack = createStackNavigator();
    const navigation: any = useNavigation();
    const queryClient = GlobalQueryClient(navigation);
    return (
        <QueryClientProvider client={queryClient}>
            <Stack.Navigator
                initialRouteName={NavigationPaths.SPLASH_SCREEN}
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name={NavigationPaths.SPLASH_SCREEN} component={SplashScreen} />
                <Stack.Screen name={NavigationPaths.LOGIN_PAGE} component={LoginScreen} />
            </Stack.Navigator>
        </QueryClientProvider>
    )
}

export default AppNavigation