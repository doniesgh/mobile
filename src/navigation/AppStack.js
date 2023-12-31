import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ReclamationScreen from "../screens/ReclamationSreen";import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfilScreen";
import InterventionScreen from "../screens/Intervention";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabNavigator from "./TabNavigator";
import CalendrierScreen from "../screens/CalendrierScreen";
import HistoriqueScreen from "../screens/HistoriqueScreen";
const Drawer = createDrawerNavigator();
const AppStack = () => {
  return (
    <>
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#cc1d45",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          fontFamily: "Poppins-Light",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reclamation"
        component={ReclamationScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="alert-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Historique"
        component={HistoriqueScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Intervention"
        component={InterventionScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="list-outline" size={22} color={color} />
          ),
        }}
      />
          <Drawer.Screen
        name="Calendrier"
        component={CalendrierScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="list-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
    </>
  );
};

export default AppStack;
