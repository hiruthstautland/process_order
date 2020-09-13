import React, { useState, useEffect } from "react";

import { Tab } from "./Tab";
import { Container } from "./Style";
import { tabVariants } from "./tabVariants";

export const Nav = ({ handleChange, allOrders, match, getAllOrders }) => {
  const [countOrders, setCountOrders] = useState({
    statusNewCount: 0,
    statusPackedCount: 0,
    statusInProcessCount: 0
  });
  const [activeTab, setActiveTab] = useState("");

  const { orderstatus } = match.params;

  useEffect(() => {
    if (allOrders) {
      setCountOrders({
        statusNewCount: allOrders.filter(order => order.order_status === "new")
          .length,
        statusPackedCount: allOrders.filter(
          order => order.order_status === "packed"
        ).length,
        statusInProcessCount: allOrders.filter(
          order => order.order_status === "in-process"
        ).length
      });
    }

    setActiveTab({ activeTab: orderstatus });
  }, [allOrders, orderstatus]);

  return (
    <React.Fragment>
      <Container>
        {tabVariants.map(tab => {
          return (
            <Tab
              key={tab.label + Date.now()}
              TabIcon={tab.TabIcon}
              label={tab.label}
              statusValue={tab.statusValue}
              countOrders={countOrders}
              handleChange={handleChange}
              activeTab={activeTab.activeTab}
              setActiveTab={setActiveTab}
              getAllOrders={getAllOrders}
            ></Tab>
          );
        })}
      </Container>
    </React.Fragment>
  );
};

export default Nav;
