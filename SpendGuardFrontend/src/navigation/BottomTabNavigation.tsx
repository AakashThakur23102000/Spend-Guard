import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import type { BottomTabParamList } from './types/navigation';

const BottomTabNavigation = () => {
    const Tab = createBottomTabNavigator<BottomTabParamList>();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
