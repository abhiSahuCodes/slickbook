import AsyncStorage from "@react-native-async-storage/async-storage";
import { MOCK_USERS, MOCK_PROVIDERS } from "../data/mockData";

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
};

export const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
  }
};

export const getUsers = async () => {
  const users = await getItem("users");
  return users ?? MOCK_USERS;
};

export const saveUsers = async (users) => {
  await setItem("users", users);
};

export const getCurrentUser = async () => {
  return await getItem("currentUser");
};

export const saveCurrentUser = async (user) => {
  await setItem("currentUser", user);
};

export const clearCurrentUser = async () => {
  await removeItem("currentUser");
};

export const getProviders = async () => {
  const providers = await getItem("providers");
  return providers ?? MOCK_PROVIDERS;
};

export const saveProviders = async (providers) => {
  await setItem("providers", providers);
};

export const getAppointments = async () => {
  const appointments = await getItem("appointments");
  return appointments ?? [];
};

export const saveAppointments = async (appointments) => {
  await setItem("appointments", appointments);
};
