import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import LoginScreen from '../screens/login/LoginScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import BottomTabNavigation from './BottomTabNavigation';
import GlobalQueryClient from '../utils/globalQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppStackParamList } from './types/navigation';

const AppNavigation = () => {
    const Stack = createStackNavigator<AppStackParamList>();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const queryClient = GlobalQueryClient({ navigation });
    return (
        <QueryClientProvider client={queryClient}>
            <Stack.Navigator
                initialRouteName="SplashScreen"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="LoginPage" component={LoginScreen} />
                <Stack.Screen name="BottomTabStack" component={BottomTabNavigation} />
            </Stack.Navigator>
        </QueryClientProvider>
    )
}

export default AppNavigation
