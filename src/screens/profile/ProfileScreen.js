import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  Text,
  Button,
  List,
  Divider,
  useTheme,
  Avatar,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../context/AuthContext";
import { useAppointments } from "../../context/AppointmentContext";

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { currentUser, logout } = useAuth();
  const { getUserAppointments } = useAppointments();

  if (!currentUser) return null;

  const appointments = getUserAppointments(currentUser.id);
  const upcomingsCount = appointments.upcoming.length;
  const cancelledCount = appointments.cancelled.length;
  const pastCount = appointments.past.length;
  const totalCount = upcomingsCount + cancelledCount + pastCount;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          // Navigation auto handles Auth stack when currentUser is null
        },
      },
    ]);
  };

  const showComingSoon = () => {
    Alert.alert("Coming Soon", "This feature is not yet available.");
  };

  const showAbout = () => {
    Alert.alert("About", "Slickbook App\nVersion 1.0.0");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <Avatar.Text
            size={100}
            label={currentUser.name.substring(0, 2).toUpperCase()}
            style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
          />
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalCount}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{upcomingsCount}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{cancelledCount}</Text>
            <Text style={styles.statLabel}>Cancelled</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.menuSection}>
          <List.Item
            title="My Appointments"
            left={(props) => (
              <List.Icon
                {...props}
                icon="calendar-check"
                color={theme.colors.primary}
              />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate("AppointmentsTab")}
          />
          <Divider />
          <List.Item
            title="Help & Support"
            left={(props) => (
              <List.Icon
                {...props}
                icon="lifebuoy"
                color={theme.colors.primary}
              />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={showComingSoon}
          />
          <Divider />
          <List.Item
            title="About"
            left={(props) => (
              <List.Icon
                {...props}
                icon="information-outline"
                color={theme.colors.primary}
              />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={showAbout}
          />
        </View>

        <View style={styles.logoutSection}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            textColor={theme.colors.error}
            style={[styles.logoutButton, { borderColor: theme.colors.error }]}
            icon="logout"
          >
            Logout
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
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
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#ddd",
  },
  divider: {
    height: 8,
    backgroundColor: "#f0f0f0",
  },
  menuSection: {
    paddingVertical: 8,
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  logoutButton: {
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default ProfileScreen;
