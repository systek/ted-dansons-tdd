export interface MenuDTO {
  ipa: number;
  lager: number;
  porter: number;
}
export type PlacedOrder = Partial<MenuDTO>;

export interface OrderDTO extends MenuDTO {
  cost: number;
}

export type BillDTO = OrderDTO;
