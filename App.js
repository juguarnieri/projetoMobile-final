import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from "./navigation/TabRoutes";

export default function App() {
  return (
    <NavigationContainer>
      <TabRoutes/>
    </NavigationContainer>
  );
} 