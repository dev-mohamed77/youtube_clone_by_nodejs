import { Request, Response, NextFunction } from "express";
import audit_action from "../config/audit_action_config";
import { DesLikeModel } from "../models/deslike_model";
import { LikeModel } from "../models/likes_model";
import { VideosModel } from "../models/videos_model";
import { prepare_audit } from "../services/audit.services";
import { ApiError } from "../services/error_handler";
import { Logger } from "../services/logger.services";
import { currentDate } from "../utils/common/current_date";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath.path);

import { getVideoDurationInSeconds } from "get-video-duration";
import { SubscriberModel } from "../models/subscriber_model";
import UserModel from "../models/users_model";

const videos = new VideosModel();
const like_model = new LikeModel();
const desLike_model = new DesLikeModel();
const subscriber = new SubscriberModel();
const logger = new Logger("videos_controller");

//create_videos
export const create_videos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;
  const video_url =
    req.file?.path != null ? "http://localhost:8800/" + req.file?.path : "";
  const created_at = currentDate();

  try {
    if (!title || !description || !req.file?.path) {
      const message = "title and description is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    let image_path;

    var video_duration = await getVideoDurationInSeconds(req.file?.path);

    // Create thumbnails
    ffmpeg(req.file?.path)
      .on("filenames", (filename) => {
        // Create video thumbnail file name
        image_path = filename;
      })
      .on("end", () => {
        // Do what to do after creating a thumbnail
        logger.info("Screenshots taken");
      })
      .on("error", (err) => {
        // Handling when an error occurs
        throw new ApiError(
          err.message,
          HttpStatusCode.BAD_REQUEST,
          err.message
        );
      })
      .takeScreenshots({
        count: 1, // 3 images
        folder: "uploads/thumbnails", // Thumbnail file storage location
        size: "320x240", // size image
        filename: "thumbnail-%b.png", // %b => filename
        timemarks: [10],
      });

    const video_image =
      image_path != null
        ? "http://127.0.0.1:8800/uploads/thumbnails/" + image_path
        : "";

    const create_video = await videos.create_video({
      user_id: req.body.user.id,
      title: title,
      description: description,
      url: video_url,
      image_url: video_image,
      duration: video_duration.toLocaleString(),
      created_at: created_at,
    });

    res.status(200).json({
      status: true,
      result: "Add videos successfully",
    });

    logger.infoWithObject("Add videos successfully", create_video);
    prepare_audit(
      audit_action.CREATE_VIDEO,
      200,
      create_video,
      null,
      "postman",
      created_at
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error add video", err);
    prepare_audit(
      audit_action.CREATE_VIDEO,
      err.HttpStatusCode ?? 500,
      null,
      err,
      "postman",
      created_at
    );
  }
};

// get videos
export const get_videos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pages = Number(req.query.pages);
  const limit = Number(req.query.limit);

  try {
    const result = await videos.get_videos(limit, pages);

    res.status(200).json({
      status: true,
      result: result,
    });
    logger.infoWithObject("Get videos successfully", result);
    prepare_audit(
      audit_action.GET_VIDEO_BY_ID,
      200,
      result,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error get video", err);
    prepare_audit(
      audit_action.GET_VIDEOS,
      err.HttpStatusCode ?? 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

// get videos random
export const get_videos_random = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pages = Number(req.query.pages);
  const limit = Number(req.query.limit);

  try {
    if (!pages || !limit) {
      const message = "pages and limit query is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }
    const result = await videos.get_all_videos_random(limit, pages);
    res.status(200).json({
      status: true,
      result: result,
    });
    logger.infoWithObject("Get videos random successfully", result);
    prepare_audit(
      audit_action.GET_VIDEOS_BY_RANDOM,
      200,
      result,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error get video random", err);
    prepare_audit(
      audit_action.GET_VIDEOS,
      err.HttpStatusCode ?? 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

//get_video_by_id
export const get_video_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.query.user_id;
  try {
    const video = await videos.get_video_by_id(req.params.id);
    if (!video.length) {
      const message = "this video is not exist";
      throw new ApiError(message, HttpStatusCode.NOT_FOUND, message);
    }

    const get_likes = await like_model.get_count_likes_in_video(req.params.id);

    const get_desLikes = await desLike_model.get_count_desLikes_in_video(
      req.params.id
    );

    let like_status: boolean;
    let desLike_status: boolean;

    const get_like_status = user_id
      ? await like_model.check_if_the_user_liked_the_video(
          user_id as string,
          req.params.id
        )
      : null;

    if (get_like_status != null) {
      if (get_like_status.length) {
        like_status = true;
      } else {
        like_status = false;
      }
    } else {
      like_status = false;
    }

    const get_desLike_status = user_id
      ? await desLike_model.check_if_the_user_desLiked_the_video(
          user_id as string,
          req.params.id
        )
      : null;

    if (get_desLike_status != null) {
      if (get_desLike_status.length) {
        desLike_status = true;
      } else {
        desLike_status = false;
      }
    } else {
      desLike_status = false;
    }

    const user_video = {
      user_id: video[0].user_video.user_id,
      user_fullname: video[0].user_video.user_fullname,
      users_username: video[0].user_video.users_username,
      users_email: video[0].user_video.users_email,
      users_image_url: video[0].user_video.users_image_url,
    };

    const result = {
      id: video[0].videos_id,
      user: user_video,
      title: video[0].videos_title,
      description: video[0].videos_description,
      views: video[0].videos_views,
      url: video[0].videos_url,
      image_url: video[0].videos_image_url,
      duration: video[0].duration,
      likes: get_likes.count,
      desLike: get_desLikes.count,
      like_status: like_status,
      desLike_status: desLike_status,
      created_at: video[0].videos_created_at,
      updated_at: video[0].videos_update_at,
    };

    res.status(200).json({
      status: true,
      result: result,
    });

    logger.infoWithObject("Get video by id successfully", video);
    prepare_audit(
      audit_action.GET_VIDEO_BY_ID,
      200,
      video,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error get video by id", err);
    prepare_audit(
      audit_action.GET_VIDEO_BY_ID,
      err.HttpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

//update_video_by_id
export const update_video_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const get_video = await videos.get_video_by_id(id);
    if (!get_video.length) {
      const message = "this video is not exist";
      throw new ApiError(message, HttpStatusCode.NOT_FOUND, message);
    }

    if (req.body.user.id === get_video[0].videos_user_id) {
      const { title, description } = req.body;

      const update_at = currentDate();

      const video = await videos.update_video_by_id(id, {
        title: title,
        description: description,
        update_at: update_at,
      });

      res.status(200).json({
        status: true,
        result: "update video by id successfully",
      });

      logger.infoWithObject("update video by id successfully", video);
      prepare_audit(
        audit_action.UPDATE_VIDEO_BY_ID,
        200,
        video,
        null,
        "postman",
        currentDate()
      );
    } else {
      const message = "You can update only your videos!";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error update video by id", err);
    prepare_audit(
      audit_action.UPDATE_VIDEO_BY_ID,
      err.HttpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

// delete_video_by_id
export const delete_video_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const get_video = await videos.get_video_by_id(req.params.id);

    if (!get_video.length) {
      const message = "this video is not exist";
      throw new ApiError(message, HttpStatusCode.NOT_FOUND, message);
    }

    if (req.body.user.id === get_video[0].videos_user_id) {
      const video = await videos.delete_video_by_id(req.params.id);

      res.status(200).json({
        status: true,
        result: "Delete video successfully",
      });

      logger.infoWithObject("update video by id successfully", video);
      prepare_audit(
        audit_action.DELETE_VIDEO_BY_ID,
        200,
        video,
        null,
        "postman",
        currentDate()
      );
    } else {
      const message = "You can delete only your videos!";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }
  } catch (err) {
    next(err);

    logger.errorWithObject(err.name || "Error delete video by id", err);
    prepare_audit(
      audit_action.DELETE_VIDEO_BY_ID,
      err.HttpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

// add view
export const add_view = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const add_view_in_video = await videos.add_view(req.params.id);

    res.status(200).json({
      status: true,
      result: "The view has been increased.",
    });
    logger.infoWithObject(
      "add view video by id successfully",
      add_view_in_video
    );
    prepare_audit(
      audit_action.ADD_VIEW_VIDEO_BY_ID,
      200,
      add_view_in_video,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error add view video by id", err);
    prepare_audit(
      audit_action.ADD_VIEW_VIDEO_BY_ID,
      err.HttpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

// trend videos
export const trend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pages = Number(req.query.pages);
  const limit = Number(req.query.limit);
  try {
    const trend_video = await videos.trend(limit, pages);

    res.status(200).json({
      status: true,
      result: trend_video,
    });
    logger.infoWithObject("Trend videos successfully", trend_video);
    prepare_audit(
      audit_action.TREND_VIDEOS,
      200,
      trend_video,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error trend videos", err);
    prepare_audit(
      audit_action.TREND_VIDEOS,
      err.HttpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

// sub
export const sub = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_result = await subscriber.GET_SUBSCRIPTION_WITH_ID(
      req.body.user.id
    );

    const video_result = await Promise.all(
      user_result.map((user) => {
        return videos.sub(user.subscriber_user_from.user_id);
      })
    );

    res.status(200).json({
      status: true,
      result: video_result
        .flat()
        .sort((a, b) => b.videos_created_at - a.videos_created_at),
    });
    logger.infoWithObject(
      "Trend videos successfully",
      video_result
        .flat()
        .sort((a, b) => b.videos_created_at - a.videos_created_at)
    );
    prepare_audit(
      audit_action.TREND_VIDEOS,
      200,
      video_result
        .flat()
        .sort((a, b) => b.videos_created_at - a.videos_created_at),
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error sub videos", err);
    prepare_audit(
      audit_action.SUB_VIDEOS,
      err.HttpStatusCode ?? 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};
