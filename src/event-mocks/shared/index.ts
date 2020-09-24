export type NestedPartial<T> = {
  [P in keyof T]?: NestedPartial<T[P]>;
};
