import moment from 'moment';

export function formatDate(inputDate) {
  return moment(inputDate, 'YYYY-MM-DD hh:mm:ss A').format('YYYY-MM-DD');
}

export function formatTime(inputTime) {
  return moment(inputTime, 'hh:mm A').format('hh:mm:ss A');
}

export function compare(start, end) {
  const formattedEnd = moment(end, 'YYYY-MM-DD hh:mm A').format('hh:mm A');
  return moment(start, 'hh:mm A').diff(moment(formattedEnd, 'hh:mm A'));
}

export function compareTime(start, end) {
  const formattedStart = moment(start, 'hh:mm A');
  const formattedEnd = moment(end, 'hh:mm A');
  return formattedStart.diff(formattedEnd);
}

export function formatLimit(inputDate) {
  const hour = parseInt(inputDate.slice(11, 13));
  const hour12 = hour % 12 || 12;
  const period = hour < 12 ? 'a' : 'p';
  const formattedDate = hour12 + period;
  return formattedDate;
}

export function findIntersection(timeSlots) {
  // Cannot find intersection with less than two time slots
  if (timeSlots.length < 2) return null;
  
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
  if (intersectionStart.isAfter(intersectionEnd)) return null;
  return { start: intersectionStart.format('hh:mm A'), end: intersectionEnd.format('hh:mm A') };
}
