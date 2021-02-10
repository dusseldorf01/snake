declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
