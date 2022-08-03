import db_connection from "../config/db.config/connection";
import { Model } from "../utils/abstract/model.abstract";
import { IUser } from "../utils/types/users.types";
import db_queries from "../config/db.config/queries";
import { ApiError } from "../services/error_handler";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";
import { currentDate } from "../utils/common/current_date";

class UserModel implements Model<IUser> {
  async add_user(params: IUser, is_password: boolean): Promise<any> {
    try {
      const query = is_password
        ? db_queries.ADD_USER
        : db_queries.ADD_USER_BY_GOOGLE;
      const values = is_password
        ? [
            params.fullname,
            params.username,
            params.email,
            params.password,
            params.created_at,
          ]
        : [
            params.fullname,
            params.username,
            params.email,
            true,
            params.created_at,
          ];
      const result = await db_connection<IUser>(query, values);

      return result.rows[0];
    } catch (err) {
      const message = `Error add user = ${err}`;
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }
  }
  async getAllUser(): Promise<IUser[]> {
    try {
      const query = db_queries.GET_ALL_USER;
      const result = await db_connection<IUser>(query);

      return result.rows;
    } catch (err) {
      const message = `Error get all user = ${err}`;
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }
  }
  async get_user_by_id(id: string): Promise<IUser> {
    try {
      const query = db_queries.GET_USER_BY_ID;
      const values = [id];
      const result = await db_connection<IUser>(query, values);

      return result.rows[0];
    } catch (err) {
      const message = "This user does not exist";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async update_user_by_id(id: string, user: IUser): Promise<IUser> {
    try {
      const query = db_queries.UPDATE_USER;
      const values = [
        user.fullname,
        user.image_url,
        user.gender,
        currentDate(),
        id,
      ];
      const result = await db_connection<IUser>(query, values);
      return result.rows[0];
    } catch (err) {
      const message = `This user does not exist`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async delete_user_by_id(id: string): Promise<IUser> {
    try {
      const query = db_queries.DELETE_USER_BY_ID;
      const values = [id];
      const result = await db_connection<IUser>(query, values);
      return result.rows[0];
    } catch (err) {
      const message = `This user does not exist`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }

  async get_user_by_username_and_email(
    username: string,
    email: string
  ): Promise<IUser[]> {
    try {
      const query = db_queries.GET_USER_BY_USERNAME_OR_EMAIL;
      const values = [username, email];

      const result = await db_connection<IUser>(query, values);

      return result.rows;
    } catch (err) {
      const message = `This user does not exist`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }

  async get_user_by_username(username: string): Promise<any[]> {
    try {
      const query = db_queries.GET_USER_BY_USERNAME;
      const value = [username];

      const result = await db_connection<any[]>(query, value);
      return result.rows;
    } catch (err) {
      const message = `This user does not exist`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }

  async get_user_by_email(email: string): Promise<any[]> {
    try {
      const query = db_queries.GET_USER_BY_EMAIL;
      const value = [email];

      const result = await db_connection<any[]>(query, value);
      return result.rows;
    } catch (err) {
      const message = `This user does not exist`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
}

export default UserModel;
