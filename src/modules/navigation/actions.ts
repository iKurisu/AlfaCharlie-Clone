import { Types, NavigationActionTypes, Item } from "./types";

const updateItems = (items: Item[]): NavigationActionTypes => ({
  type: Types.UPDATE_ITEMS,
  items
});

export default { updateItems };
