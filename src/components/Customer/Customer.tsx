import React from "react";
import cheersImage from "../../img/cheers.jpeg";
import beersImage from "../../img/beer-glass.jpeg";
import { Props, TestId } from "./types";
//import { Order } from "../Order";
//import { Served } from "../Served";

const Loading = () => (
  <>
    <h3>Filling up the glasses</h3>
    <img
      src={beersImage}
      data-testid={TestId.loading}
      className="loading"
      alt="Filling your glasses"
    />
  </>
);

const Customer = ({ order: asyncOrder }: Props) => (
  <div className="customer">
    <header data-testid={TestId.header}>
      <h3>Welcome to Cheers</h3>
      <img src={cheersImage} alt="Our Bar" />
    </header>

    {asyncOrder.match({
      NotAsked: () => (
        <></> // Should show order-component
      ),
      Loading: () => <></>, // Should show loading-component
      Done: (order) => (
        <></> // should show served-component
      ),
    })}
  </div>
);

export default Customer;
