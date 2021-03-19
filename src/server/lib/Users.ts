import { getUserById } from '@/api/user';
import type { IUser } from '@/models/user';

export default class Users {
  ids: Set<number> = new Set<number>();

  // eslint-disable-next-line class-methods-use-this
  getFetch(id: number): Promise<IUser> {
    return getUserById(id)
      .then((response) => (response.data));
  }

  add(id: number) {
    this.ids.add(id);
  }

  fetchRequests(): Promise<IUser>[] {
    return Array.from(this.ids.values()).map((id) => this.getFetch(id));
  }
}
