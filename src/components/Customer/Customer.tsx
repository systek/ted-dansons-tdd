import cheersImage from "../../img/cheers.jpeg";
import beersImage from "../../img/beer-glass.jpeg";
import { Props, TestId } from "./types";
import { Order } from "../Order";
import { Served } from "../Served";

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

const Customer = ({
  order: asyncOrder,
  menu,
  orderAction,
  moreBeer,
  payBill,
}: Props) => (
  <div className="customer">
    <header data-testid={TestId.header}>
      <h3>Welcome to Cheers</h3>
      <img src={cheersImage} alt="Our Bar" />
    </header>

    {asyncOrder.match({
      NotAsked: () => (
        <Order {...{ "data-testid": TestId.order, menu, orderAction }} />
      ),
      Loading: () => <Loading />,
      Done: (order) => (
        <Served
          {...{
            "data-testid": TestId.served,
            order,
            moreBeer,
            payBill,
          }}
        />
      ),
    })}
  </div>
);

export default Customer;
