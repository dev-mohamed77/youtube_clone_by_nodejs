import db_connection from "../config/db.config/connection";
import db_queries from "../config/db.config/queries";
import { ApiError } from "../services/error_handler";
import { LikeModelStor } from "../utils/abstract/like_model.abstract";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";
import { Like } from "../utils/types/like.types";

export class LikeModel implements LikeModelStor<Like> {
  async add_like(user_id: string, video_id: string): Promise<Like> {
    try {
      const query = db_queries.ADD_LIKE;
      const values = [user_id, video_id];

      const result = await db_connection<Like>(query, values);
      return result.rows[0];
    } catch (err) {
      const message = `Error add like in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async delete_like(user_id: string, video_id: string): Promise<Like> {
    try {
      const query = db_queries.DELETE_LIKE;
      const values = [user_id, video_id];

      const result = await db_connection<Like>(query, values);

      return result.rows[0];
    } catch (err) {
      const message = `Error delete like in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async get_count_likes_in_video(video_id: string): Promise<any> {
    try {
      const query = db_queries.GET_LIKES_IN_VIDEOS;
      const values = [video_id];

      const result = await db_connection(query, values);

      return result.rows[0];
    } catch (err) {
      const message = `Error get like in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
  async check_if_the_user_liked_the_video(
    user_id: string,
    video_id: string
  ): Promise<any[]> {
    try {
      const query = db_queries.GET_LIKE_BY_USER_ID_AND_VIDEO_ID;
      const values = [user_id, video_id];

      const result = await db_connection(query, values);

      return result.rows;
    } catch (err) {
      const message = `Error check if the user liked the video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
}
