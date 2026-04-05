import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import { useAuth } from "../context/AuthContext";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ProviderListScreen from "../screens/providers/ProviderListScreen";
import ProviderDetailScreen from "../screens/providers/ProviderDetailScreen";
import AppointmentsScreen from "../screens/appointments/AppointmentsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProviderStack = createNativeStackNavigator();

const ProviderNavigator = () => {
  return (
    <ProviderStack.Navigator screenOptions={{ headerShown: false }}>
      <ProviderStack.Screen
        name="ProviderList"
        component={ProviderListScreen}
      />
      <ProviderStack.Screen
        name="ProviderDetail"
        component={ProviderDetailScreen}
      />
    </ProviderStack.Navigator>
  );
};

const MainTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "ProvidersTab") {
            iconName = focused ? "stethoscope" : "account-group-outline";
          } else if (route.name === "AppointmentsTab") {
            iconName = focused ? "calendar-check" : "calendar-check-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "account-circle" : "account-circle-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="ProvidersTab"
        component={ProviderNavigator}
        options={{ title: "Providers" }}
      />
      <Tab.Screen
        name="AppointmentsTab"
        component={AppointmentsScreen}
        options={{ title: "Appointments" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const { currentUser, isLoading } = useAuth();
  const theme = useTheme();

  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser == null ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RootNavigator;
