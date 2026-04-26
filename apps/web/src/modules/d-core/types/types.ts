export type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends
  (x: infer I) => void
    ? I
    : never;

export type Simplify<T> = {
  [K in keyof T]: T[K];
};

export type FlattenKeys<T> =
  T extends object
    ? Simplify<
        UnionToIntersection<
          {
            [K in keyof T]:
              { [P in K]: true } &
              (T[K] extends object ? FlattenKeys<T[K]> : {})
          }[keyof T]
        >
      >
    : {};

export type FilterKeysByPrefix<T, Prefix extends string> = Simplify<{
  [K in keyof T as K extends `${Prefix}${string}` ? K : never]: T[K]
}>;