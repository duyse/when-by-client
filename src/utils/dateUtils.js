import moment from 'moment';

export function convertISOToCustomFormat(inputDate) {
  return moment(inputDate, moment.ISO_8601).format('hh:mm:ss A');
}

export function getEndTime(startTime, hours) {
  const duration = moment.duration(hours, 'minutes');
  startTime = moment(startTime, 'hh:mm:ss A');
  const endTime = startTime.clone().add(duration);
  return endTime.format('hh:mm:ss A');
}

// Define function to find intersection of time slots
export function findIntersection(timeSlots) {
  const parsedTimeSlots = timeSlots.map(slot => ({
    start: moment(slot.start, 'YYYY-MM-DD HH:mm:ss'),
    end: moment(slot.end, 'YYYY-MM-DD HH:mm:ss')
  }));
  // Find maximum start time and minimum end time
  let maxStartTime = parsedTimeSlots[0].start;
  let minEndTime = parsedTimeSlots[0].end;
  console.log(maxStartTime, minEndTime);
  parsedTimeSlots.forEach(slot => {
    if (slot.start.isAfter(maxStartTime)) {
      maxStartTime = slot.start;
    }
    if (slot.end.isBefore(minEndTime)) {
      minEndTime = slot.end;
    }
  });

  // Check for intersection
  if (maxStartTime.isBefore(minEndTime) || maxStartTime.isSame(minEndTime)) {
    return { start: maxStartTime, end: minEndTime };
  } else {
    return null; // No intersection
  }
}