export default function shallowUserDataEqual(objA:{[key:string]:any},
  objB:{[key:string]:any}) :boolean {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i += 1) {
    // eslint-disable-next-line no-prototype-builtins
    if (!objB.hasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }
  return true;
}
