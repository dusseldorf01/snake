export default function userDataChanged(oldData:object, newData:object):boolean {
  return JSON.stringify(oldData) !== JSON.stringify(newData);
}
