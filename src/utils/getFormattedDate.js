import { format } from "date-fns";

export function getFormattedDate(timestamp) {
  const formattedDate = format(new Date(timestamp), "dd-MM-yyyy hh:mm");

  return formattedDate;
}
