import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";
import TabRoutes from "./TabRoutes";
import CasosCriminais from "../pages/CasosCriminais";
import LiveTv from "../pages/LiveTv";
import Podcast from "../pages/Podcasts";
import Quiz from "../pages/Quiz";
const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000339" },
        headerTintColor: "#fff",
        headerTitleAlign: "center", 
        headerTitle: () => (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "#fff",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: "#fff" }}>CRIME </Text>
            <Text style={{ color: "red" }}>WHISPERS</Text>
          </Text>
        ),
      }}
    >
      <Drawer.Screen name="Home" component={TabRoutes} />
      <Drawer.Screen name="Casos Criminais" component={CasosCriminais} />
      <Drawer.Screen name="Videos" component={LiveTv} />
      <Drawer.Screen name="Podcast" component={Podcast} />
      <Drawer.Screen name="Quiz" component={Quiz} />
    </Drawer.Navigator>
    );
}