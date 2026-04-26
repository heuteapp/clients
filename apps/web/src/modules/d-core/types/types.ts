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

export type OmitKeysByPrefix<T, Prefix extends string> = Simplify<{
  [K in keyof T as K extends `${Prefix}${string}` ? never : K]: T[K]
}>;

export type GetNestedValue<
  T,
  K extends string,
  LeafValue = unknown,
  BranchValue = Record<string, any>
> = K extends keyof T
  ? T[K] extends BranchValue | LeafValue
    ? T[K]
    : never
  : T extends Record<string, infer U>
  ? GetNestedValue<U, K, LeafValue, BranchValue>
  : never;