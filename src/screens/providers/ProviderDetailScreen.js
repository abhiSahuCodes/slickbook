import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Text,
  Button,
  Appbar,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppointments } from "../../context/AppointmentContext";
import { useAuth } from "../../context/AuthContext";
import { groupSlotsByDate } from "../../utils/dateHelpers";
import SlotPicker from "../../components/SlotPicker";
import EmptyState from "../../components/EmptyState";

const ProviderDetailScreen = ({ route, navigation }) => {
  const { providerId } = route.params;
  const theme = useTheme();
  const { providers, bookAppointment } = useAppointments();
  const { currentUser } = useAuth();

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  const provider = providers.find((p) => p.id === providerId);

  const groupedSlots = useMemo(() => {
    if (!provider) return [];
    return groupSlotsByDate(provider.availableSlots);
  }, [provider]);

  if (!provider) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Appbar.Header style={{ backgroundColor: "transparent" }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
        <EmptyState title="Provider not found" icon="account-off" />
      </SafeAreaView>
    );
  }

  const handleBook = async () => {
    if (!selectedSlot || !currentUser) return;

    try {
      setIsBooking(true);
      await bookAppointment(currentUser.id, provider, selectedSlot);
      Alert.alert(
        "Appointment Booked!",
        `Your appointment with ${provider.name} has been confirmed.`,
        [
          {
            text: "View Appointments",
            onPress: () => navigation.navigate("AppointmentsTab"),
          },
          { text: "OK", style: "cancel" },
        ],
      );
    } catch (error) {
      Alert.alert(
        "Booking Failed",
        "There was an error booking your appointment. Please try again.",
      );
    } finally {
      setIsBooking(false);
      setSelectedSlot(null); // Reset selection
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      <Appbar.Header style={{ backgroundColor: "transparent" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="" />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <Image source={{ uri: provider.image }} style={styles.avatarLarge} />
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.category}>{provider.category}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <MaterialCommunityIcons name="star" size={24} color="#FFD700" />
              <Text style={styles.statValue}>{provider.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <MaterialCommunityIcons
                name="briefcase-outline"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={styles.statValue}>{provider.experience}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>
        </View>

        <View style={styles.bioSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{provider.bio}</Text>
        </View>

        <View style={styles.slotsSection}>
          <Text style={styles.sectionTitle}>Available Slots</Text>
          {groupedSlots.length === 0 ? (
            <View style={styles.emptySlotContainer}>
              <MaterialCommunityIcons
                name="calendar-remove"
                size={48}
                color="gray"
                style={{ marginBottom: 16 }}
              />
              <Text style={styles.noSlotsText}>
                No available slots for the next 7 days.
              </Text>
            </View>
          ) : (
            <SlotPicker
              groupedSlots={groupedSlots}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          )}
        </View>
      </ScrollView>

      {groupedSlots.length > 0 && (
        <View
          style={[
            styles.bottomBar,
            { borderTopColor: theme.colors.surfaceVariant },
          ]}
        >
          <Button
            mode="contained"
            onPress={handleBook}
            disabled={!selectedSlot || isBooking}
            loading={isBooking}
            style={styles.bookButton}
            contentStyle={styles.bookButtonContent}
          >
            Confirm Booking
          </Button>
        </View>
      )}
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
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  category: {
    fontSize: 16,
    color: "gray",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "90%",
  },
  statBox: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: "#ddd",
    marginHorizontal: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  bioSection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
  },
  slotsSection: {
    paddingLeft: 20,
    marginTop: 32,
    marginBottom: 16,
  },
  emptySlotContainer: {
    alignItems: "center",
    padding: 32,
    marginRight: 20,
  },
  noSlotsText: {
    color: "gray",
    fontSize: 14,
    textAlign: "center",
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    backgroundColor: "white",
  },
  bookButton: {
    borderRadius: 8,
  },
  bookButtonContent: {
    paddingVertical: 8,
  },
});

export default ProviderDetailScreen;
