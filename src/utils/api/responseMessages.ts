const templateCommon = 'Some error occurred';
const templateWhile = `${templateCommon} while`;
const templateDuring = `${templateCommon} during`;

const responseErrorMessages = {
  authentication() {
    return `${templateDuring} authentication`;
  },
  cookieIsNotValid() {
    return 'Cookie is not valid';
  },
  create(entity: string) {
    return `${templateWhile} creating the ${entity}`;
  },
  custom(text: string) {
    return `${templateWhile} ${text}`;
  },
  delete(entity: string, id: number) {
    return `${templateWhile} deleting ${entity} with id = ${id}`;
  },
  getAll(entity: string) {
    return `${templateWhile} retrieving ${entity}`;
  },
  getById(entity: string, id: number) {
    return `${templateWhile} retrieving ${entity} with id = ${id}`;
  },
  notExist(entity: string, id: number) {
    return `The ${entity} with id = ${id} does not exist`;
  },
  required<T>(fields: (keyof T)[]) {
    const label = fields.length === 1 ? 'field is' : 'fields are';
    return `The ${fields.map((field) => `"${field}"`).join(', ')} ${label} required`;
  },
  unexpected() {
    return 'Unexpected error occurred';
  },
  update(entity: string, id: number) {
    return `${templateWhile} updating ${entity} with id = ${id}`;
  },
  userNotFound() {
    return 'User is not found';
  },
};

export default responseErrorMessages;
