export default (data?: Record<string, unknown>): string => {
  if (data === undefined) {
    return '';
  }

  const transform = (value: any, prop: string): any => {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.map((item, i) => transform(item, `${prop}[${i}]`))
          .join('&');
      }
      return Object
        .entries(value as object)
        .map(([p, v]) => transform(v, `${prop}[${p}]`))
        .join('&');
    }

    return `${prop}=${value}`;
  };

  return `?${Object
    .entries(data)
    .map(([prop, value]) => transform(value, prop))
    .join('&')}`;
};
