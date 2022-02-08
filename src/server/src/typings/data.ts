export interface Model {
  create?: (...args: any) => Promise<unknown>;
}

export interface Table {
  name: string;
  query: string;
}
