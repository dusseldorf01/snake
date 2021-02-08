type CheckFunctionType = () => string;

export default function validate<T>(
  config: Partial<Record<keyof T, CheckFunctionType[]>>,
): Partial<Record<keyof T, string>> {
  return Object.entries<CheckFunctionType[]>(config as Record<keyof T, CheckFunctionType[]>)
    .map(([key, fns]) => ([key, fns.reduce<string | false>((prev, curr) => (
      prev !== '' ? prev : curr()
    ), '')]))
    .filter(([, fns]) => !!fns)
    .reduce((prev, [key, error]) => ({ ...prev, [key as keyof T]: error }), {});
}
