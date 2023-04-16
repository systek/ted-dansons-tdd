import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import "./App.scss";
import { Customer, Props } from "./components/Customer";

import "./App.scss";

import { Props as CustomerProps } from "./components/Customer";
import { moreBeer, orderInit, payBill } from "./redux/app/app.actions";
import { getMenu, getOrder } from "./redux/app/app.selectors";
import { RootState } from "./redux/root.reducer";
import { DispatchProps, StateProps } from "./redux/types";

export enum TestId {
  customer = "app-customer",
}
export const AppContainer = ({ ...props }: CustomerProps) => (
  <div className="App">
    <Customer {...{ "data-testid": TestId.customer, ...props }} />;
  </div>
);
export const mapDispatchToProps = (
  dispatch: Dispatch
): DispatchProps<Props> => ({});

export const mapStateToProps = (state: RootState): StateProps<Props> =>
  ({} as Props);

export default () => <>App is not connected</>;
