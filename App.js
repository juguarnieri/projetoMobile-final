import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerRoutes from "./navigation/DrawerRoutes";
import TabRoutes from "./navigation/TabRoutes";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerRoutes/>
      <TabRoutes/>
    </NavigationContainer>
  );
} 