import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, Chip, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatSlotLabel, isPast } from '../utils/dateHelpers';

const AppointmentCard = ({ appointment, onCancel }) => {
  const theme = useTheme();

  const handleCancel = () => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => onCancel(appointment.id), style: "destructive" }
      ]
    );
  };

  const getStatusColor = () => {
    switch (appointment.status) {
      case 'cancelled':
        return '#f44336'; // Red
      case 'upcoming':
        return '#4caf50'; // Green
      default:
        return 'gray'; // Past or unknown
    }
  };

  const getStatusLabel = () => {
    if (appointment.status === 'cancelled') return 'Cancelled';
    if (isPast(appointment.slot.datetime)) return 'Past';
    return 'Upcoming';
  };

  const statusColor = getStatusColor();
  const statusLabel = getStatusLabel();

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <View style={styles.headerRow}>
          <Card.Cover 
            source={{ uri: appointment.providerImage }} 
            style={styles.avatar} 
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name} numberOfLines={1}>{appointment.providerName}</Text>
            <Text style={styles.category}>{appointment.providerCategory}</Text>
            
            <View style={styles.timeRow}>
              <MaterialCommunityIcons name="clock-outline" size={16} color="gray" />
              <Text style={styles.timeText}>{appointment.slot.label}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footerRow}>
          <Chip
            textStyle={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
            style={[styles.chip, { backgroundColor: statusColor }]}
          >
            {statusLabel}
          </Chip>
          
          {statusLabel === 'Upcoming' && onCancel && (
            <Button 
              mode="text" 
              textColor={theme.colors.error}
              onPress={handleCancel}
              compact
            >
              Cancel
            </Button>
          )}
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
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  timeText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 6,
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  chip: {
    height: 28,
    justifyContent: 'center',
  },
});

export default AppointmentCard;
