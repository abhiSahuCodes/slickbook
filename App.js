import React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/context/AuthContext";
import { AppointmentProvider } from "./src/context/AppointmentContext";
import RootNavigator from "./src/navigation/RootNavigator";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6C63FF",
    secondary: "#FF6584",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    error: "#B00020",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <AppointmentProvider>
              <RootNavigator />
            </AppointmentProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
