export interface Field<TFieldValue> {
  value: TFieldValue;
  editable?: string;
}
export interface Item<TDataSourceItem> {
  fields: TDataSourceItem;
}

export interface ItemList<TDataSourceItem> extends Array<Item<TDataSourceItem>> {}

export interface AppState {}
