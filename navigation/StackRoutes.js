import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import DrawerRoutes from './DrawerRoutes';
import UserProfile from '../pages/UserId';

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Drawer" component={DrawerRoutes} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
    );
}