export const Events = {
  TODO: "todo",
  CURSOR: "cursor"
} as const;

export type Events = (typeof Events)[keyof typeof Events];
