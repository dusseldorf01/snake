export default function getLast<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
