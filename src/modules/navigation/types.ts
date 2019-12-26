export enum Types {
  UPDATE_ITEMS = "navigation/UPDATE_ITEMS"
}

export interface Item {
  name: string;
  href?: string;
  onClick?: () => <T>() => T;
}

export interface NavigationState {
  items: Item[];
}

interface UpdateItemsActions {
  type: Types.UPDATE_ITEMS;
  items: Item[];
}

export type NavigationActionTypes = UpdateItemsActions;
