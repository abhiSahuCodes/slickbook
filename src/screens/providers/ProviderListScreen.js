import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import { Text, Chip, ActivityIndicator, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppointments } from "../../context/AppointmentContext";
import ProviderCard from "../../components/ProviderCard";
import EmptyState from "../../components/EmptyState";

const CATEGORIES = [
  "All",
  "Doctor",
  "Dentist",
  "Salon",
  "Fitness Trainer",
  "Therapist",
  "Nutritionist",
];

const ProviderListScreen = ({ navigation }) => {
  const theme = useTheme();
  const { providers } = useAppointments();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX skeleton feeling
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProviders =
    selectedCategory === "All"
      ? providers
      : providers.filter((p) => p.category === selectedCategory);

  const renderSkeleton = () => {
    return (
      <View style={styles.skeletonContainer}>
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.skeletonCard,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find a Provider</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {CATEGORIES.map((category) => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.chip,
                selectedCategory === category
                  ? { backgroundColor: theme.colors.primaryContainer }
                  : null,
              ]}
              textStyle={
                selectedCategory === category
                  ? {
                      color: theme.colors.onPrimaryContainer,
                      fontWeight: "bold",
                    }
                  : null
              }
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        renderSkeleton()
      ) : filteredProviders.length === 0 ? (
        <EmptyState
          icon="account-search-outline"
          title="No providers found"
          subtitle={`We couldn't find any providers in the "${selectedCategory}" category.`}
        />
      ) : (
        <FlatList
          data={filteredProviders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProviderCard
              provider={item}
              onPress={() =>
                navigation.navigate("ProviderDetail", { providerId: item.id })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
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
  filterContainer: {
    height: 60,
  },
  filterScroll: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  chip: {
    marginRight: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
  skeletonContainer: {
    padding: 16,
  },
  skeletonCard: {
    height: 100,
    borderRadius: 12,
    marginBottom: 16,
    opacity: 0.5,
  },
});

export default ProviderListScreen;
