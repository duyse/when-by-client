export default function findBestTimeSlot(duration, slots) {
  // Sort time slots by start time
  slots.sort((a, b) => a[0] - b[0]);

  let bestSlot = null;
  let maxAvailableTime = 0;

  // Iterate over sorted time slots
  for (let i = 0; i < slots.length; i++) {
    const [start, end] = slots[i];
    const availableTime = end - start;

    // Check if this time slot is long enough for the meeting
    if (availableTime >= duration) {
      // If it's the first valid slot or it provides more available time, update the best slot
      if (!bestSlot || availableTime > maxAvailableTime) {
        bestSlot = slots[i];
        maxAvailableTime = availableTime;
      }
    }
  }
  return bestSlot;
}