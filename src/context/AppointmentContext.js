import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getAppointments,
  saveAppointments,
  getProviders,
  saveProviders,
} from "../utils/storage";
import { isPast } from "../utils/dateHelpers";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [providers, setProviders] = useState([]);

  const loadData = async () => {
    try {
      const loadedAppointments = await getAppointments();
      const loadedProviders = await getProviders();
      setAppointments(loadedAppointments);
      setProviders(loadedProviders);
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const bookAppointment = async (userId, provider, slot) => {
    try {
      const newAppointment = {
        id: `apt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        providerId: provider.id,
        providerName: provider.name,
        providerImage: provider.image,
        providerCategory: provider.category,
        slot,
        status: "upcoming",
        bookedAt: new Date().toISOString(),
      };

      const updatedAppointments = [...appointments, newAppointment];
      await saveAppointments(updatedAppointments);

      const updatedProviders = providers.map((p) => {
        if (p.id === provider.id) {
          return {
            ...p,
            availableSlots: p.availableSlots.map((s) =>
              s.id === slot.id ? { ...s, isBooked: true } : s,
            ),
          };
        }
        return p;
      });

      await saveProviders(updatedProviders);

      setAppointments(updatedAppointments);
      setProviders(updatedProviders);

      return newAppointment;
    } catch (error) {
      console.error("Error booking appointment", error);
      throw error;
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const appointmentToCancel = appointments.find(
        (a) => a.id === appointmentId,
      );
      if (!appointmentToCancel) return;

      const updatedAppointments = appointments.map((a) =>
        a.id === appointmentId ? { ...a, status: "cancelled" } : a,
      );
      await saveAppointments(updatedAppointments);

      const updatedProviders = providers.map((p) => {
        if (p.id === appointmentToCancel.providerId) {
          return {
            ...p,
            availableSlots: p.availableSlots.map((s) =>
              s.id === appointmentToCancel.slot.id
                ? { ...s, isBooked: false }
                : s,
            ),
          };
        }
        return p;
      });
      await saveProviders(updatedProviders);

      setAppointments(updatedAppointments);
      setProviders(updatedProviders);
    } catch (error) {
      console.error("Error cancelling appointment", error);
      throw error;
    }
  };

  const getUserAppointments = (userId) => {
    const userAppointments = appointments.filter((a) => a.userId === userId);

    const categorized = {
      upcoming: [],
      past: [],
      cancelled: [],
    };

    userAppointments.forEach((apt) => {
      if (apt.status === "cancelled") {
        categorized.cancelled.push(apt);
      } else if (isPast(apt.slot.datetime)) {
        categorized.past.push(apt);
      } else {
        categorized.upcoming.push(apt);
      }
    });

    // Sort by datetime
    categorized.upcoming.sort(
      (a, b) =>
        new Date(a.slot.datetime).getTime() -
        new Date(b.slot.datetime).getTime(),
    );
    categorized.past.sort(
      (a, b) =>
        new Date(b.slot.datetime).getTime() -
        new Date(a.slot.datetime).getTime(),
    ); // descending
    categorized.cancelled.sort(
      (a, b) =>
        new Date(b.slot.datetime).getTime() -
        new Date(a.slot.datetime).getTime(),
    );

    return categorized;
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        providers,
        loadData,
        bookAppointment,
        cancelAppointment,
        getUserAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);
