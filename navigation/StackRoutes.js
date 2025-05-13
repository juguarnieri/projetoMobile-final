import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import TabRoutes from './TabRoutes';

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabRoutes" component={TabRoutes} />
        </Stack.Navigator>
    );
}