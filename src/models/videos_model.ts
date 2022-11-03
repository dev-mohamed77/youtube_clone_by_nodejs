import { Request, Response } from "express";
import db_connection from "../config/db.config/connection";
import db_queries from "../config/db.config/queries";
import { ApiError } from "../services/error_handler";
import { VideosModelStore } from "../utils/abstract/videos_model.abstract";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";
import { Videos } from "../utils/types/videos.types";

export class VideosModel implements VideosModelStore<Videos> {
  async get_videos_by_user_id(
    id: string,
    limit: number,
    pages: number
  ): Promise<any[]> {
    try {
      const query = db_queries.GET_VIDEO_BY_USER_ID;
      const values = [id, limit, pages];
      const result = await db_connection(query, values);
      return result.rows;
    } catch (err) {
      const message = "Error get videos by user id";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} = ${err}`
      );
    }
  }
  async create_video(params: Videos): Promise<Videos> {
    try {
      const query = db_queries.ADD_VIDEOS;
      const values = [
        params.user_id,
        params.title,
        params.description,
        params.url,
        params.image_url,
        params.duration,
        params.created_at,
      ];
      const result = await db_connection<Videos>(query, values);
      return result.rows[0];
    } catch (err) {
      const message = "Error add video";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} = ${err}`
      );
    }
  }

  async get_videos(limit: number, pages: number): Promise<any[]> {
    try {
      const query = db_queries.GET_VIDEOS;
      const values = [limit, pages];
      const result = await db_connection(query, values);

      return result.rows;
    } catch (err) {
      const message = "Error get all videos";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} = ${err}`
      );
    }
  }

  async get_all_videos_random(limit: number, pages: number): Promise<any[]> {
    try {
      const query = db_queries.GET_VIDEOS_RANDOM;
      const values = [limit, pages];
      const result = await db_connection<any[]>(query, values);
      return result.rows;
    } catch (err) {
      const message = "Error get all videos by random";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} = ${err}`
      );
    }
  }

  async get_video_by_id(id: string): Promise<any[]> {
    try {
      const query = db_queries.GET_VIDEO_BY_ID;
      const value = [id];
      const result = await db_connection<Videos>(query, value);
      return result.rows;
    } catch (err) {
      const message = "Error get video by id";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} = ${err}`
      );
    }
  }

  async update_video_by_id(id: string, video: Videos): Promise<Videos> {
    try {
      const query = db_queries.UPDATE_VIDEO;
      const value = [video.title, video.description, video.update_at, id];
      const result = await db_connection<Videos>(query, value);
      return result.rows[0];
    } catch (err) {
      const message = "Error update video by id";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} = ${err}`
      );
    }
  }

  async delete_video_by_id(id: string): Promise<Videos> {
    try {
      const query = db_queries.DELETE_VIDEO;
      const value = [id];
      const result = await db_connection<Videos>(query, value);
      return result.rows[0];
    } catch (err) {
      const message = "Error delete video by id";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} = ${err}`
      );
    }
  }

  async add_view(id: string): Promise<Videos> {
    try {
      const query = db_queries.UPDATE_VIDEO_BY_VIEWS;
      const value = [id];
      const result = await db_connection<Videos>(query, value);
      return result.rows[0];
    } catch (err) {
      const message = "Error add view to video by id";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} = ${err}`
      );
    }
  }

  async trend(limit: number, pages: number): Promise<any[]> {
    try {
      const query = db_queries.TREND_VIDEOS;
      const values = [limit, pages];
      const result = await db_connection(query, values);

      return result.rows;
    } catch (err) {
      const message = "Error trend videos";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} = ${err.message}`
      );
    }
  }

  async sub(user_id: string): Promise<any[]> {
    try {
      const query = db_queries.SUB_VIDEOS;
      const values = [user_id];
      const result = await db_connection(query, values);

      return result.rows;
    } catch (err) {
      const message = "Error sub videos";
      throw new ApiError(
        message,
        HttpStatusCode.BAD_REQUEST,
        `${message} = ${err.message}`
      );
    }
  }
}
