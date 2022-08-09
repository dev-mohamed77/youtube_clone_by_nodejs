export abstract class UserModelStore<T> {
  abstract add_user(params: T, is_password: boolean): Promise<T>;
  abstract getAllUser(): Promise<T[]>;
  abstract get_user_by_id(id: string): Promise<T>;
  abstract update_user_by_id(id: string, user: T): Promise<T>;
  abstract delete_user_by_id(id: string): Promise<T>;
}
