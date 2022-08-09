import { DesLikeModel } from "../models/deslike_model";
import { Logger } from "../services/logger.services";
import { LikeModel } from "../models/likes_model";
import { Request, Response, NextFunction } from "express";
import { prepare_audit } from "../services/audit.services";
import audit_action from "../config/audit_action_config";
import { currentDate } from "../utils/common/current_date";
import { ApiError } from "../services/error_handler";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";

const logger = new Logger("like_and_deslike_controller");
const desLike_model = new DesLikeModel();
const like_model = new LikeModel();

export const add_like = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.body.user_id;
  const video_id = req.body.video_id;

  try {
    if (!user_id || !video_id) {
      const message = "user_id and video_id is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const add_like_video = await like_model.add_like(user_id, video_id);

    res.status(200).json({
      status: true,
      message: "Add like successfully",
      result: add_like_video,
    });
    logger.infoWithObject("Add like successfully", add_like_video);
    prepare_audit(
      audit_action.ADD_LIKE,
      200,
      add_like_video,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error add like", err);
    prepare_audit(
      audit_action.ADD_LIKE,
      err.httpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};
export const delete_like = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.body.user_id;
  const video_id = req.body.video_id;
  try {
    if (!user_id || !video_id) {
      const message = "user_id and video_id is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const delete_like_video = await like_model.delete_like(user_id, video_id);

    res.status(200).json({
      status: true,
      message: "Delete like successfully",
      result: delete_like_video,
    });
    logger.infoWithObject("Delete like successfully", delete_like_video);
    prepare_audit(
      audit_action.ADD_LIKE,
      200,
      delete_like_video,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error delete like", err);
    prepare_audit(
      audit_action.DELETE_LIKE,
      err.httpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

// desLike

export const add_desLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.body.user_id;
  const video_id = req.body.video_id;
  try {
    if (!user_id || !video_id) {
      const message = "user_id and video_id is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const add_desLike_video = await desLike_model.add_desLike(
      user_id,
      video_id
    );

    res.status(200).json({
      status: true,
      message: "Add desLike successfully",
      result: add_desLike_video,
    });
    logger.infoWithObject("Add desLike successfully", add_desLike_video);
    prepare_audit(
      audit_action.ADD_LIKE,
      200,
      add_desLike_video,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    logger.errorWithObject(err.name || "Error add desLike", err);
    prepare_audit(
      audit_action.ADD_DESLIKE,
      err.httpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

// delete desLike
export const delete_desLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.body.user_id;
  const video_id = req.body.video_id;
  try {
    if (!user_id || !video_id) {
      const message = "user_id and video_id is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const delete_desLike_video = await desLike_model.delete_desLike(
      user_id,
      video_id
    );

    res.status(200).json({
      status: true,
      message: "Delete desLike successfully",
      result: delete_desLike_video,
    });
    logger.infoWithObject("Delete desLike successfully", delete_desLike_video);
    prepare_audit(
      audit_action.ADD_LIKE,
      200,
      delete_desLike_video,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    logger.errorWithObject(err.name || "Error delete desLike", err);
    prepare_audit(
      audit_action.DELETE_DESLIKE,
      err.httpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};
