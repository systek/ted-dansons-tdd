import { MenuDTO } from "../../api";
import PlaceOrder from "./PlaceOrder";
import { Props, TestId } from "./types";

const Order = ({ orderAction, menu: asyncMenu }: Props) => (
  <div className="order">
    <div className="container">
      {asyncMenu.match({
        NotAsked: () => <></>,
        Loading: () => <></>,
        Done: (res) =>
          res.match({
            Ok: (menu) => <></>,
            Error: () => <></>,
          }),
      })}
    </div>
  </div>
);

export default Order;
