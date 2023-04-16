import React from "react";
import "./App.scss";
import { mockData } from "./api/__mocks__";
import { Props, Customer } from "./components/Customer";

export enum TestId {
  customer = "app-customer",
}

let props: Props = {
  order: mockData.order.notAsked,
  menu: mockData.menu.done,
  orderAction: console.log,
  payBill: console.log,
  moreBeer: console.log,
};
const App = () => (
  <div className="App">
    <Customer {...{ "data-testid": TestId.customer, ...props }} />
  </div>
);

export default App;
