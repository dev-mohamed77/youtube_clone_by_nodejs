import db_connection from "../config/db.config/connection";
import { DesLikeModelStor } from "../utils/abstract/deslike_model.abstract";
import { DesLike } from "../utils/types/deslike.type";
import { Like } from "../utils/types/like.types";
import db_queries from "../config/db.config/queries";
import { ApiError } from "../services/error_handler";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";

export class DesLikeModel implements DesLikeModelStor<DesLike> {
  async add_desLike(user_id: string, video_id: string): Promise<DesLike> {
    try {
      const query = db_queries.ADD_DESLIKE;
      const values = [user_id, video_id];

      const result = await db_connection<Like>(query, values);

      return result.rows[0];
    } catch (err) {
      const message = `Error add desLike in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async delete_desLike(user_id: string, video_id: string): Promise<DesLike> {
    try {
      const query = db_queries.DELETE_DESLIKE;
      const values = [user_id, video_id];

      const result = await db_connection<Like>(query, values);

      return result.rows[0];
    } catch (err) {
      const message = `Error delete desLike in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async get_count_desLikes_in_video(video_id: string): Promise<any> {
    try {
      const query = db_queries.GET_DESLIKE_IN_VIDEO;
      const values = [video_id];

      const result = await db_connection(query, values);

      return result.rows[0];
    } catch (err) {
      const message = `Error get desLike in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async check_if_the_user_desLiked_the_video(
    user_id: string,
    video_id: string
  ): Promise<any[]> {
    try {
      const query = db_queries.GET_DESLIKE_BY_USER_ID_AND_VIDEO_ID;
      const values = [user_id, video_id];

      const result = await db_connection(query, values);

      return result.rows;
    } catch (err) {
      const message = `Error check if the user desLiked the video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
}
