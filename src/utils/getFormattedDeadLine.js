import { differenceInMinutes } from "date-fns";

export function getFormattedDeadLine(timestamp1, timestamp2) {
  const minutesLeft = differenceInMinutes(timestamp1, timestamp2);
  const hours = Math.floor(minutesLeft / 60);
  const minutes = minutesLeft % 60;
  let deadline = "";
  if (hours < 1 && minutes < 1) {
    deadline = "0";
  } else if (hours < 1 && minutes === 1) {
    deadline = `${minutes} minutt`;
  } else if (hours < 1) {
    deadline = `${minutes} minutter`;
  } else if (hours === 1) {
    deadline = `${hours} time og ${minutes} minutter`;
  } else if (hours === 1 && minutes === 0) {
    deadline = `${hours} time og ${minutes} minutter`;
  } else {
    deadline = `${hours} timer og ${minutes} minutter`;
  }

  return deadline;
}
