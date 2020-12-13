export default function checkRequiredFields<T>(values: T, exclude: (keyof T)[] = []): Partial<Record<keyof T, 'Обязательное поле'>> {
  return Object.entries(values).reduce((prev, [key, value]) => (value === '' && !exclude.includes(key as keyof T) ? { ...prev, [key]: 'Обязательное поле' } : { ...prev }), {});
}
