import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import DrawerRoutes from './DrawerRoutes';
import UserProfile from '../pages/UserId';
import CasosCriminais from '../pages/CasosCriminais';
import PaginaDecada70 from '../pages/PaginaDecada70';
import PaginaDecada80 from '../pages/PaginaDecada80';
import PaginaDecada90 from '../pages/PaginaDecada90';
import PaginaDecada2000 from '../pages/PaginaDecada2000';
import PaginaDecada2010 from '../pages/PaginaDecada2010';
import PaginaDecada2020 from '../pages/PaginaDecada2020';

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Drawer" component={DrawerRoutes} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="CasosCriminais" component={CasosCriminais} />
            <Stack.Screen name="PaginaDecada70" component={PaginaDecada70} />
            <Stack.Screen name="PaginaDecada80" component={PaginaDecada80} />
            <Stack.Screen name="PaginaDecada90" component={PaginaDecada90} />
            <Stack.Screen name="PaginaDecada2000" component={PaginaDecada2000} />
            <Stack.Screen name="PaginaDecada2010" component={PaginaDecada2010} />
            <Stack.Screen name="PaginaDecada2020" component={PaginaDecada2020} />
        </Stack.Navigator>
    );
}