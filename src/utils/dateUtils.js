import moment from 'moment';

export function formatDate(inputDate) {
  return moment(inputDate).format('YYYY-MM-DD hh:mm:ss A');
}

export function findIntersection(timeSlots) {
  if (timeSlots.length < 2) {
    return null; // Cannot find intersection with less than two time slots
  }
  const firstSlots = Array.from(timeSlots[0].slots).map(slot => ({
    start: moment(slot.start, 'hh:mm A'),
    end: moment(slot.end, 'hh:mm A'),
  }));
  let intersectionStart = firstSlots[0].start;
  let intersectionEnd = firstSlots[0].end;
  for (const attendee of timeSlots) {
    const attendeeSlots = Array.from(attendee.slots).map(slot => ({
      start: moment(slot.start, 'hh:mm A'),
      end: moment(slot.end, 'hh:mm A'),
    }));

    for (const slot of attendeeSlots) {
      // If there's no overlap, return null
      if (slot.end.isBefore(intersectionStart) || slot.start.isAfter(intersectionEnd))
        return null;
      // Update intersection
      intersectionStart = moment.max(intersectionStart, slot.start);
      intersectionEnd = moment.min(intersectionEnd, slot.end);
    }
  }
  // If intersectionStart is after intersectionEnd, there's no overlap
  if (intersectionStart.isAfter(intersectionEnd)) {
    return null;
  }
  return { start: intersectionStart.format('hh:mm A'), end: intersectionEnd.format('hh:mm A') };
}
