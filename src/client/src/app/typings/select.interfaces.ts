export interface SelectItem {
  title: string;
  value: unknown;
}

export interface SelectItemGroup {
  name: string;
  value: Array<SelectItem>;
}
