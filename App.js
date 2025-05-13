import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerRoutes from "./navigation/DrawerRoutes";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerRoutes/>
    </NavigationContainer>
  );
}