import { getHours, addHours, addDays, setHours, setMinutes } from "date-fns";

//returns if day of timestamp is Sunday, Saturday or Weekday
export function getDayFromOrderDate(timestamp) {
  let time = new Date(timestamp);
  let day;

  switch (time.getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      day = "Weekday";
  }

  return day;
}

function getExpiryIfHoliday(timestamp) {
  let time = new Date(timestamp);
  let newDay = addDays(time, 1);
  let setHoursOfDay = setHours(newDay, 11);
  let setMinutesOfDay = setMinutes(setHoursOfDay, 0);
  let expireTime = compensateTimezone(setMinutesOfDay);
  return expireTime.toJSON();
}

function getExpiryIfDayBeforeHoliday(timestamp) {
  let time = new Date(timestamp);
  const hourOfDay = getHours(time);
  const openingTime = 10;
  const closingTime = 17;
  let expireTime;

  if (hourOfDay < openingTime) {
    let setHoursOfDay = setHours(time, 11);
    let setMinutesOfDay = setMinutes(setHoursOfDay, 0);
    expireTime = compensateTimezone(setMinutesOfDay);
  } else if (hourOfDay >= closingTime - 2) {
    let newDay = addDays(time, 2);
    let setHoursOfDay = setHours(newDay, 11);
    let setMinutesOfDay = setMinutes(setHoursOfDay, 0);
    expireTime = compensateTimezone(setMinutesOfDay);
  } else {
    expireTime = addHours(time, 2);
  }

  return expireTime.toJSON();
}

function getExpiryIfWeekday(timestamp) {
  let time = new Date(timestamp);
  const hourOfDay = getHours(time);
  const openingTime = 10;
  const closingTime = 19;
  let expireTime;

  if (hourOfDay < openingTime) {
    let setHoursOfDay = setHours(time, 11);
    let setMinutesOfDay = setMinutes(setHoursOfDay, 0);
    expireTime = compensateTimezone(setMinutesOfDay);
  } else if (hourOfDay >= closingTime - 2) {
    let newDay = addDays(time, 1);
    let setHoursOfDay = setHours(newDay, 11);
    let setMinutesOfDay = setMinutes(setHoursOfDay, 0);
    expireTime = compensateTimezone(setMinutesOfDay);
  } else {
    expireTime = addHours(time, 2);
  }

  return expireTime.toJSON();
}

function compensateTimezone(date) {
  // getTimezoneOffset returns server offset from UTC
  // measured in minutes. Negative if ahead of UTC.
  let offset_milliseconds = date.getTimezoneOffset() * 60 * 1000;

  return new Date(date.getTime() - offset_milliseconds);
}

// eksempel tidstempel
// const created_in_app_at = ("2020-01-17T00:50:01.001Z")
export function getExpiryFromOrderDate(timestamp) {
  let expireTime;

  let time = timestamp;

  switch (getDayFromOrderDate(time)) {
    case "Sunday":
      expireTime = getExpiryIfHoliday(timestamp);
      break;
    case "Saturday":
      expireTime = getExpiryIfDayBeforeHoliday(timestamp);
      break;
    default:
      expireTime = getExpiryIfWeekday(timestamp);
      break;
  }
  return expireTime;
}
