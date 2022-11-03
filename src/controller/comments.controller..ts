import { Request, Response, NextFunction } from "express";
import audit_action from "../config/audit_action_config";
import { CommentsModel } from "../models/comments_model";
import { prepare_audit } from "../services/audit.services";
import { ApiError } from "../services/error_handler";
import { Logger } from "../services/logger.services";
import { currentDate } from "../utils/common/current_date";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";

const logger = new Logger("comments_controller");

const comment_model = new CommentsModel();

export const add_comment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const video_id = req.body.video_id;
  const title = req.body.title;
  const created_at = currentDate();

  try {
    if (!video_id || !title) {
      const message = "video_id and title are required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const add_comment_result = await comment_model.add_comment({
      user_id: req.body.user.id,
      video_id: video_id,
      title: title,
      created_at: created_at,
    });

    res.status(200).json({
      status: true,
      message: "Add comment successfully",
      result: add_comment_result,
    });
    logger.errorWithObject("Add comment successfully", add_comment_result);
    prepare_audit(
      audit_action.ADD_COMMENT,
      200,
      add_comment_result,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error Add comment", err);
    prepare_audit(
      audit_action.ADD_COMMENT,
      err.HttpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const get_comments_in_video = async (
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

    const result = await comment_model.get_comments_by_video_id(
      req.params.id,
      limit,
      pages
    );
    if (!result.length) {
      const message = "this video is not exist";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    res.status(200).json({
      status: true,
      result: result,
    });
    logger.errorWithObject("get comments successfully", result);
    prepare_audit(
      audit_action.GET_COMMENTS_IN_VIDEO,
      200,
      result,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error get comments in video", err);
    prepare_audit(
      audit_action.GET_COMMENTS_IN_VIDEO,
      err.HttpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const get_comment_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await comment_model.get_comment_by_id(req.params.id);
    if (!result.length) {
      const message = "this comment is not exist";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    res.status(200).json({
      status: true,
      result: result[0],
    });
    logger.errorWithObject("get comment by id successfully", result);
    prepare_audit(
      audit_action.GET_COMMENT,
      200,
      result,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error get comment by id in video", err);
    prepare_audit(
      audit_action.GET_COMMENT,
      err.HttpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const update_comment_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title = req.body.title;
  const updated_at = currentDate();
  try {
    const get_comment_result = await comment_model.get_comment_by_id(
      req.params.id
    );

    if (!get_comment_result.length) {
      const message = "this comment is not exist";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    if (req.body.user.id === get_comment_result[0].comments_user.user_id) {
      const result = await comment_model.update_comment_by_id(req.params.id, {
        title: title,
        updated_at: updated_at,
      });

      res.status(200).json({
        status: true,
        result: "Update comment successfully",
      });
      logger.errorWithObject("update comment by id successfully", result);
      prepare_audit(
        audit_action.UPDATE_COMMENT,
        200,
        result,
        null,
        "postman",
        currentDate()
      );
    } else {
      const message = "You can update only your comments!";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }
  } catch (err) {
    next(err);
    logger.errorWithObject(
      err.name || "Error update comment by id in video",
      err
    );
    prepare_audit(
      audit_action.UPDATE_COMMENT,
      err.HttpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const delete_comment_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const get_comment_result = await comment_model.get_comment_by_id(
      req.params.id
    );
    if (!get_comment_result.length) {
      const message = "this comment is not exist";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    if (req.body.user.id === get_comment_result[0].comments_user.user_id) {
      const result = await comment_model.delete_comment_by_id(req.params.id);

      res.status(200).json({
        status: true,
        result: "The comment has been deleted successfully",
      });

      logger.errorWithObject("update comment by id successfully", result);
      prepare_audit(
        audit_action.UPDATE_COMMENT,
        200,
        result,
        null,
        "postman",
        currentDate()
      );
    } else {
      const message = "You can update only your comments!";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }
  } catch (err) {
    next(err);
    logger.errorWithObject(
      err.name || "Error delete comment by id in video",
      err
    );
    prepare_audit(
      audit_action.DELETE_COMMENT,
      err.HttpStatusCode,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};
