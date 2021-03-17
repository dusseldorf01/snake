type CamelCaseType<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCaseType<P3>}`
  : Lowercase<S>;

export type KeysToCamelCaseType<T> = {
  [K in keyof T as CamelCaseType<string &K>]: T[K] extends {} ? KeysToCamelCaseType<T[K]> : T[K]
};

export default function mapToCamelCase<T extends Record<string, any>>(
  data: T,
): KeysToCamelCaseType<T> {
  return Object.entries(data)
    .reduce((curr, [key, value]) => ({ ...curr, [key.replace(/_\w/, (match) => match[1].toUpperCase())]: value }), {} as KeysToCamelCaseType<T>);
}
