import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../pages/Search";
import LiveTv from "../pages/Feed";
import Account from "../pages/Users";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator        
            screenOptions={{
            tabBarActiveTintColor: 'red', 
            tabBarInactiveTintColor: 'white', 
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
            name="Feed" 
            component={LiveTv}
            options={{
                tabBarIcon: ({ color, size}) => (
                    <MaterialIcons name="live-tv" size={size} color={color} />
                ),
            }} 
        />
              <Tab.Screen 
            name="Users" 
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