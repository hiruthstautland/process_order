import {
  IconNew,
  IconPacked,
  IconInProcess,
  IconDelivered,
  IconRejected
} from "./icons";

export const tabVariants = [
  {
    label: "Nye",
    statusValue: "new",
    TabIcon: IconNew
  },
  {
    label: "Plukk",
    statusValue: "packed",
    TabIcon: IconPacked
  },
  {
    label: "Hente",
    statusValue: "in-process",
    TabIcon: IconInProcess
  },
  {
    label: "Levert",
    statusValue: "delivered",
    TabIcon: IconDelivered
  },
  {
    label: "Avvist",
    statusValue: "rejected",
    TabIcon: IconRejected
  }
];
