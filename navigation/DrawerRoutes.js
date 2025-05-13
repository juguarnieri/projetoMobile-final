import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabRoutes from "./TabRoutes";
import Recentes from "../pages/Recentes";
import CasosCriminais from "../pages/CasosCriminais";
import Podcast from "../pages/Podcast";
import Quiz from "../pages/Quiz";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
    <Drawer.Navigator
    screenOptions={{
        drawerActiveTintColor: 'red',
        drawerInactiveTintColor: 'gray',
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerShown: true,
        }}
    >
    <Drawer.Screen name="Home" component={TabRoutes} />
    <Drawer.Screen name="Recentes" component={Recentes} />
    <Drawer.Screen name="Casos Criminais" component={CasosCriminais} />
    <Drawer.Screen name="Podcast" component={Podcast} />
    <Drawer.Screen name="Quiz" component={Quiz} />

    </Drawer.Navigator>
    );
}