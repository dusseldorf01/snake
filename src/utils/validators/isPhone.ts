export default (str: string): boolean => /^((8|\+7)[- ]?)?((\d{3})?[- ]?)?[\d- ]{7,10}$/.test(str);
