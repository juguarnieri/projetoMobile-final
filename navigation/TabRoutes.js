import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Search from "../pages/Recentes";
import LiveTv from "../pages/LiveTv";
import Account from "../pages/Account";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator        
            screenOptions={{
            tabBarActiveTintColor: 'red',  // cor quando ativa
            tabBarInactiveTintColor: 'white', // cor quando inativa
            tabBarStyle: {
                backgroundColor: '#000339',
                borderTopWidth: 0.5,
                paddingBottom: 10,
                paddingTop: 10,
                height: 70,
            },
            headerShown: false,
        }}
    >
            <Tab.Screen 
            name="Home" 
            component={Home}
            options={{
                tabBarIcon: ({ color , size}) => (
                    <FontAwesome name="home" size={size} color={color} />
                ),
            }} 
        />
              <Tab.Screen 
            name="Search"
            component={Search}
            options={{
                tabBarIcon: ({ color, size}) => (
                    <FontAwesome name="search" size={size} color=
                    {color} />
                ),
            }} 
        />
              <Tab.Screen 
            name="LiveTv" 
            component={LiveTv}
            options={{
                tabBarIcon: ({ color, size}) => (
                    <MaterialIcons name="live-tv" size={size} color={color} />
                ),
            }} 
        />
              <Tab.Screen 
            name="Account" 
            component={Account}
            options={{
                tabBarIcon: ({ color, size}) => (
                    <MaterialCommunityIcons name="account-circle" size={size} color={color}/>
                ),
            }} 
        />

        </Tab.Navigator>
    );
}