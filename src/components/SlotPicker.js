import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";

const SlotPicker = ({ groupedSlots, selectedSlot, onSelectSlot }) => {
  const theme = useTheme();

  if (!groupedSlots || groupedSlots.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {groupedSlots.map((group) => (
        <View key={group.dateLabel} style={styles.groupContainer}>
          <Text style={styles.dateLabel}>{group.dateLabel}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.slotsRow}
          >
            {group.slots.map((slot) => {
              const isSelected = selectedSlot && selectedSlot.id === slot.id;

              // Extract just the time part from the label (e.g., "09:00 AM")
              const timeLabel = slot.label.split(" • ")[1] || slot.label;

              return (
                <Button
                  key={slot.id}
                  mode={isSelected ? "contained" : "outlined"}
                  onPress={() => onSelectSlot(slot)}
                  style={styles.slotButton}
                  labelStyle={[
                    styles.slotLabel,
                    isSelected
                      ? { color: theme.colors.onPrimary }
                      : { color: theme.colors.primary },
                  ]}
                  compact
                >
                  {timeLabel}
                </Button>
              );
            })}
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  groupContainer: {
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  slotsRow: {
    paddingRight: 16,
  },
  slotButton: {
    marginRight: 8,
    borderRadius: 8,
  },
  slotLabel: {
    fontSize: 12,
  },
});

export default SlotPicker;
