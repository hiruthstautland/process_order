import React, { useState, useEffect } from "react";
import MainViewOrders from "../MainView/MainViewOrders";
import { getAllOrdersDB } from "../../clientAPI/clientAPI";
import Nav from "./Nav/index";
import ErrorCard from "../ErrorAndInfoCard/ErrorCard";
import { ContentLoader } from "../ContentLoader";
import { Container, Main, StatusCenter, InputField, Label } from "./Style";

const MainView = ({ history, match }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [now, setNow] = useState(new Date());
  let { orderstatus } = match.params;

  const storeName = "store_1_bogstadveien";
  let user = true;

  // Default /new
  if (orderstatus === undefined) {
    history.push("/new");
  }

  useEffect(
    () => {
      if (user) {
        setLoading(true);
        getAllOrders();
        setInterval(getAllOrders, 300000);
        setInterval(updateTime, 60000);
      }

      return () => {
        setLoading(null);
        clearInterval(getAllOrders);
        clearInterval(updateTime);
        setAllOrders([]);
      };
    },
    // eslint-disable-next-line
    [storeName]
  );

  const updateTime = () => {
    setNow(new Date());
  };

  const getAllOrders = async () => {
    try {
      const orders = await getAllOrdersDB(storeName);
      setAllOrders(orders);
    } catch (error) {
      console.log(`Error: ${error}`);
      setError(true);
    }
    setLoading(false);
  };

  const handleChange = (orderstatus) => {
    history.push(`/${orderstatus}`);
  };

  const updateSearch = (event) => {
    setSearch(event.target.value.substr(0, 20));
  };

  const handleCardClick = (ordernumber) => {
    history.push(`/${orderstatus}/${ordernumber}`);
  };

  if (error === true) {
    return <ErrorCard history={history} />;
  }

  if (loading) {
    return <ContentLoader />;
  }

  return (
    <Container finishedOrders={orderstatus === "rejected"}>
      <Nav
        handleChange={handleChange}
        allOrders={allOrders}
        match={match}
        getAllOrders={getAllOrders}
      />
      <Main>
        {allOrders.length || allOrders ? (
          <>
            <StatusCenter rejected={orderstatus === "rejected"}>
              {orderstatus === "in-process" && (
                <Label>
                  <InputField
                    type="text"
                    value={search}
                    onChange={updateSearch}
                    placeholder="Søk på navn og telefonnummer"
                  />
                </Label>
              )}
            </StatusCenter>
            <MainViewOrders
              now={now}
              orderstatus={orderstatus}
              allOrders={allOrders}
              handleCardClick={handleCardClick}
              search={search}
            />
          </>
        ) : (
          <ContentLoader />
        )}
      </Main>
    </Container>
  );
};

export default MainView;
