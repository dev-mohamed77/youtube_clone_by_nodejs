import { CommentsModelStor } from "../utils/abstract/comments_model.abstract";
import { Comments } from "../utils/types/comments.type";
import db_queries from "../config/db.config/queries";
import { ApiError } from "../services/error_handler";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";
import db_connection from "../config/db.config/connection";

export class CommentsModel implements CommentsModelStor<Comments> {
  async add_comment(comment: Comments): Promise<Comments> {
    try {
      const query = db_queries.ADD_COMMENT;
      const values = [
        comment.user_id,
        comment.video_id,
        comment.title,
        comment.created_at,
      ];
      const result = await db_connection<Comments>(query, values);
      return result.rows[0];
    } catch (err) {
      const message = `Error add comment in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }

  async get_comments_by_video_id(
    video_id: string,
    limit: number,
    pages: number
  ): Promise<any[]> {
    try {
      const query = db_queries.GET_COMMENTS_IN_VIDEO;
      const value = [video_id, limit, pages];
      const result = await db_connection(query, value);
      return result.rows;
    } catch (err) {
      const message = `Error get comment in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }

  async get_comment_by_id(id: string): Promise<any[]> {
    try {
      const query = db_queries.GET_COMMENT_BY_ID;
      const value = [id];
      const result = await db_connection(query, value);
      return result.rows;
    } catch (err) {
      const message = `Error get comment in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }

  async update_comment_by_id(id: string, comment: Comments): Promise<Comments> {
    try {
      const query = db_queries.UPDATE_COMMENT_BY_ID;
      const value = [comment.title, comment.updated_at, id];
      const result = await db_connection<Comments>(query, value);
      return result.rows[0];
    } catch (err) {
      const message = `Error update comment in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }

  async delete_comment_by_id(id: string): Promise<Comments> {
    try {
      const query = db_queries.DELETE_COMMENT_BY_ID;
      const value = [id];
      const result = await db_connection<Comments>(query, value);
      return result.rows[0];
    } catch (err) {
      const message = `Error delete comment in video`;
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} || ${err}`
      );
    }
  }
}
