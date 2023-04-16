import React, { useEffect, useState } from "react";
import { OrderDTO } from "../../api";

import { Props, TestId } from "./types";
const size = 15;
const PlaceOrder = ({ orderAction }: Pick<Props, "orderAction">) => {
  const [placedOrder, setOrder] = useState<OrderDTO | undefined>(undefined);
  const orderNr = 123;
  useEffect(() => {
    if (orderAction && placedOrder) {
      orderAction({ placedOrder, orderNr });
    }
  }, [orderAction, placedOrder]);

  const onOrderSubmit = (e: any) => {
    e.preventDefault();
    const [beer, amount] = Array.from(e.target.querySelectorAll("input")).map(
      ({ value }: any) => value
    );
    setOrder({ [beer]: amount } as unknown as OrderDTO);
  };
  return (
    <section data-testid={TestId.order}>
      <h4>Your order:</h4>
      <form onSubmit={onOrderSubmit}>
        <input
          {...{
            autoComplete: "off",
            type: "text",
            name: "beer",
            id: "beer",
            size,
            placeholder: "Type of beer",
          }}
        />
        <br />
        <input
          {...{
            autoComplete: "off",
            type: "number",
            name: "amount",
            id: "amount",
            size,
            placeholder: "How many glasses",
          }}
        />
        <br />
        <button type="submit">Place Order</button>
      </form>
    </section>
  );
};

export default PlaceOrder;
