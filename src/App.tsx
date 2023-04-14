import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import "./App.scss";

import { Props as CustomerProps, Customer } from "./components/Customer";
import { moreBeer, orderInit, payBill } from "./redux/app/app.actions";
import { RootState } from "./redux/root.reducer";
import { DispatchProps, StateProps } from "./redux/types";
import { getMenu, getOrder } from "./redux/app/app.selectors";

export type Props = CustomerProps;
export enum TestId {
  customer = "app-customer",
}
export const AppContainer = ({ ...props }: Props) => (
  <div className="App">
    <Customer {...{ "data-testid": TestId.customer, ...props }} />;
  </div>
);
export const mapDispatchToProps = (
  dispatch: Dispatch
): DispatchProps<Props> => ({
  orderAction: bindActionCreators(orderInit, dispatch),
  moreBeer: bindActionCreators(moreBeer, dispatch),
  payBill: bindActionCreators(payBill, dispatch),
});

export const mapStateToProps = (state: RootState): StateProps<Props> =>
  ({
    order: getOrder(state),
    menu: getMenu(state),
  } as Props);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
