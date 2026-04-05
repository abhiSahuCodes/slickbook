import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProviderCard = ({ provider, onPress }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.headerRow}>
          <Card.Cover source={{ uri: provider.image }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {provider.name}
            </Text>
            <Text style={styles.category}>{provider.category}</Text>

            <View style={styles.statsRow}>
              <View style={styles.badge}>
                <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.statText}>
                  {provider.rating.toFixed(1)}
                </Text>
              </View>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
              >
                <MaterialCommunityIcons
                  name="briefcase-outline"
                  size={16}
                  color={theme.colors.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.statText,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {provider.experience}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.actionIcon}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={theme.colors.primary}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: "gray",
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#fffbeb",
  },
  statText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "500",
  },
  actionIcon: {
    marginLeft: 8,
  },
});

export default ProviderCard;
