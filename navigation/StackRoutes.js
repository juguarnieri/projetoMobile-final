import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import DrawerRoutes from './DrawerRoutes';

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Recentes" component={DrawerRoutes} />
            <Stack.Screen name="Casos Criminais" component={DrawerRoutes} />
            <Stack.Screen name="Podcast" component={DrawerRoutes} />
            <Stack.Screen name="Quiz" component={DrawerRoutes} />
        </Stack.Navigator>
    );
}