import React from "react";

import { Button } from "./Style";

export const Tab = ({
  TabIcon,
  label,
  statusValue,
  countOrders,
  handleChange,
  activeTab,
  setActiveTab,
  getAllOrders
}) => {
  let count;
  let className;

  switch (statusValue) {
    case "new":
      count = countOrders.statusNewCount;
      break;
    case "packed":
      count = countOrders.statusPackedCount;
      break;
    case "in-process":
      count = countOrders.statusInProcessCount;
      break;
    default:
      count = 0;
  }

  if (activeTab === statusValue) {
    className = "tab-active";
  }

  return (
    <Button
      className={className}
      onClick={() => {
        handleChange(statusValue);
        setActiveTab({ activeTab: statusValue });
        getAllOrders();
      }}
    >
      <TabIcon />
      <span>
        {label} {count > 0 && `(${count})`}
      </span>
    </Button>
  );
};
