import { format, isBefore, parseISO } from "date-fns";

export const formatSlotLabel = (isoString) => {
  try {
    const date = parseISO(isoString);
    return format(date, "EEE, d MMM • hh:mm a");
  } catch (error) {
    return "Invalid Date";
  }
};

export const isPast = (isoString) => {
  try {
    const date = parseISO(isoString);
    return isBefore(date, new Date());
  } catch (error) {
    return false;
  }
};

export const groupSlotsByDate = (slots) => {
  if (!slots) return [];

  const filteredSlots = slots.filter(
    (slot) => !slot.isBooked && !isPast(slot.datetime),
  );

  const grouped = filteredSlots.reduce((acc, slot) => {
    try {
      const date = parseISO(slot.datetime);
      const dateLabel = format(date, "EEE, d MMM yyyy");

      if (!acc[dateLabel]) {
        acc[dateLabel] = {
          dateLabel,
          slots: [],
          dateObj: date,
        };
      }
      acc[dateLabel].slots.push(slot);
    } catch (e) {
      console.error("Error parsing date:", e);
    }
    return acc;
  }, {});

  return Object.values(grouped).sort(
    (a, b) => a.dateObj.getTime() - b.dateObj.getTime(),
  );
};
