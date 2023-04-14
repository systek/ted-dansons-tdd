import { orderTemplate } from "../../api/api";
import { Props, TestId } from "./types";
const orderNr = 123;

export const render = (template: string, data: Object) =>
  Object.entries({ ...data }).reduce(
    (res, [key, value]) =>
      res.replace(
        new RegExp(`{{\\s*${key}\\s*}}`, "gi"),
        value as unknown as string
      ),
    template || ""
  );

const Served = ({ order, moreBeer, payBill }: Props) => (
  <div className="order">
    {order.match({
      Ok: ({ cost, ...result }) => (
        <>
          <p data-testid={TestId.ok}>
            {render(
              "Here's your {{ipa}} ipa, {{lager}} lager & {{porter}} porter, sir",
              { ...orderTemplate, ...result }
            )}
          </p>
          <p>Current bill i bar: {cost},-</p>
        </>
      ),
      Error: (error) => <p data-testid={TestId.error}>{error as string}</p>,
    })}
    <button onClick={() => moreBeer({ orderNr })}>New Order</button>
    {order.isOk() && (
      <button onClick={() => payBill({ orderNr })}>
        Bay bill of {order.get().cost}
      </button>
    )}
  </div>
);

export default Served;
