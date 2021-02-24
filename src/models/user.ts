export interface IUserCreate {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IUser extends IUserCreate {
  id: number;
  avatar: string | null;
}
