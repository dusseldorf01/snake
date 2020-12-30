type ValidateFunctionType = () => string;

export default function validate<T>(
  config: Partial<Record<keyof T, ValidateFunctionType[]>>,
): Partial<Record<keyof T, string>> {
  return Object.entries<ValidateFunctionType[]>(config as Record<keyof T, ValidateFunctionType[]>)
    .map(([key, fns]) => ([key, fns.reduce<string | false>((prev, curr) => (
      prev !== '' ? prev : curr()
    ), '')]))
    .filter(([, fns]) => !!fns)
    .reduce((prev, [key, error]) => ({ ...prev, [key as keyof T]: error }), {});
}
