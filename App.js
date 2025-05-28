import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./navigation/StackRoutes";

export default function App() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}