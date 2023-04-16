import React from "react";
import { MenuDTO } from "../../api";
import PlaceOrder from "./PlaceOrder";
import { Props, TestId } from "./types";

const Menu = ({ menu }: { menu: MenuDTO }) => (
  <section className="menu" data-testid={TestId.menu}>
    <h4>Menu:</h4>
    <ul>
      {Object.entries(menu).map(([key, val]) => (
        <li key={key}>
          {key}: <span>{val},-</span>
        </li>
      ))}
    </ul>
  </section>
);

const Loading = () => <h3>Vent mens vi henter menyen</h3>;

const Order = ({ orderAction, menu: asyncMenu }: Props) => (
  <div className="order">
    <div className="container">
      {asyncMenu.match({
        NotAsked: () => <Loading />,
        Loading: () => <Loading />,
        Done: (res) =>
          res.match({
            Ok: (menu) => (
              <>
                <Menu {...{ menu }} />
                <PlaceOrder {...{ orderAction }} />
              </>
            ),
            Error: () => <h3>Vi klarer ikke å laste menyen nå</h3>,
          }),
      })}
    </div>
  </div>
);

export default Order;
