export enum Params {
  ordernr = ":ordernr",
  receiptnr = ":receiptnr",
}

export const paths = {
  menu: "/menu",
  order: {
    root: `/order/${Params.ordernr}`,
    cancel: `/order/${Params.ordernr}/cancel`,
    receipt: `/receipt/${Params.receiptnr}`,
  },
};
