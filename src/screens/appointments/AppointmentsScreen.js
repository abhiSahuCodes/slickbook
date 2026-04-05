import React, { useState, useCallback } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import { useAppointments } from "../../context/AppointmentContext";
import { useAuth } from "../../context/AuthContext";
import AppointmentCard from "../../components/AppointmentCard";
import EmptyState from "../../components/EmptyState";

const TABS = ["Upcoming", "Past", "Cancelled"];

const AppointmentsScreen = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const { getUserAppointments, cancelAppointment } = useAppointments();

  const [activeTab, setActiveTab] = useState("Upcoming");
  const [appointments, setAppointments] = useState({
    upcoming: [],
    past: [],
    cancelled: [],
  });

  useFocusEffect(
    useCallback(() => {
      if (currentUser) {
        const userApts = getUserAppointments(currentUser.id);
        setAppointments(userApts);
      }
    }, [currentUser, getUserAppointments]),
  );

  const handleCancel = async (appointmentId) => {
    await cancelAppointment(appointmentId);
    // Refresh list locally
    if (currentUser) {
      setAppointments(getUserAppointments(currentUser.id));
    }
  };

  const currentList = appointments[activeTab.toLowerCase()] || [];

  const renderEmptyMessage = () => {
    switch (activeTab) {
      case "Upcoming":
        return "You don't have any upcoming appointments.";
      case "Past":
        return "You don't have any past appointments yet.";
      case "Cancelled":
        return "You haven't cancelled any appointments.";
      default:
        return "No appointments found.";
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Appointments</Text>
      </View>

      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && {
                borderBottomColor: theme.colors.primary,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab
                  ? { color: theme.colors.primary, fontWeight: "bold" }
                  : { color: "gray" },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentList.length === 0 ? (
        <EmptyState
          icon="calendar-blank"
          title={`No ${activeTab} Appointments`}
          subtitle={renderEmptyMessage()}
        />
      ) : (
        <FlatList
          data={currentList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentCard
              appointment={item}
              onCancel={activeTab === "Upcoming" ? handleCancel : undefined}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
});

export default AppointmentsScreen;
