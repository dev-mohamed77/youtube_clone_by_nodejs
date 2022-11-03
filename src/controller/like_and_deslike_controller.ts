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

export const add_and_delete_like = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const video_id = req.body.video_id;

  try {
    if (!video_id) {
      const message = "video_id is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const check_if_the_user_liked_the_video =
      await like_model.check_if_the_user_liked_the_video(
        req.body.user.id,
        video_id
      );

    if (!check_if_the_user_liked_the_video.length) {
      const check_if_the_user_desLiked_the_video =
        await desLike_model.check_if_the_user_desLiked_the_video(
          req.body.user.id,
          video_id
        );

      if (!check_if_the_user_desLiked_the_video.length) {
        const add_like_video = await like_model.add_like(
          req.body.user.id,
          video_id
        );

        res.status(200).json({
          status: true,
          result: {
            like: true,
            des_like: false,
          },
          message: "Add like successfully",
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
      } else {
        const remove_desLike_by_video_id = await desLike_model.delete_desLike(
          req.body.user.id,
          video_id
        );

        const add_like_video = await like_model.add_like(
          req.body.user.id,
          video_id
        );

        res.status(200).json({
          status: true,
          result: {
            like: true,
            des_like: false,
          },
          message: "Add like successfully",
        });

        logger.infoWithObject("Add like successfully", {
          remove_desLike_by_video_id,
          add_like_video,
        });
        prepare_audit(
          audit_action.ADD_LIKE,
          200,
          { remove_desLike_by_video_id, add_like_video },
          null,
          "postman",
          currentDate()
        );
      }
    } else {
      const remove_like = await like_model.delete_like(
        req.body.user.id,
        video_id
      );

      res.status(200).json({
        status: true,
        result: {
          like: false,
          des_like: false,
        },
        message: "Delete like successfully",
      });

      logger.infoWithObject("Delete like successfully", remove_like);

      prepare_audit(
        audit_action.ADD_LIKE,
        200,
        remove_like,
        null,
        "postman",
        currentDate()
      );
    }
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error add And Delete like", err);
    prepare_audit(
      audit_action.ADD_LIKE,
      err.httpStatusCode ?? 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const add_and_delete_desLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const video_id = req.body.video_id;
  try {
    if (!video_id) {
      const message = "video_id is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const check_if_the_user_desLiked_the_video =
      await desLike_model.check_if_the_user_desLiked_the_video(
        req.body.user.id,
        video_id
      );

    if (!check_if_the_user_desLiked_the_video.length) {
      const check_if_the_user_liked_the_video =
        await like_model.check_if_the_user_liked_the_video(
          req.body.user.id,
          video_id
        );
      if (!check_if_the_user_liked_the_video.length) {
        const add_desLike_video = await desLike_model.add_desLike(
          req.body.user.id,
          video_id
        );

        console.log(add_desLike_video);

        res.status(200).json({
          status: true,
          result: {
            like: false,
            des_like: true,
          },
          message: "Add desLike successfully",
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
      } else {
        const remove_like_by_video = await like_model.delete_like(
          req.body.user.id,
          video_id
        );

        const add_desLike_video = await desLike_model.add_desLike(
          req.body.user.id,
          video_id
        );

        console.log(add_desLike_video);

        res.status(200).json({
          status: true,
          result: {
            like: false,
            des_like: true,
          },
          message: "Add desLike successfully",
        });

        logger.infoWithObject("Add desLike successfully", {
          remove_like_by_video,
          add_desLike_video,
        });
        prepare_audit(
          audit_action.ADD_LIKE,
          200,
          { remove_like_by_video, add_desLike_video },
          null,
          "postman",
          currentDate()
        );
      }
    } else {
      const delete_desLike = await desLike_model.delete_desLike(
        req.body.user.id,
        video_id
      );
      res.status(200).json({
        status: true,
        result: {
          like: false,
          des_like: false,
        },
        message: "Add desLike successfully",
      });

      logger.infoWithObject("Add desLike successfully", delete_desLike);
      prepare_audit(
        audit_action.ADD_LIKE,
        200,
        delete_desLike,
        null,
        "postman",
        currentDate()
      );
    }
  } catch (err) {
    logger.errorWithObject(err.name || "Error add and desLike desLike", err);
    prepare_audit(
      audit_action.ADD_DESLIKE,
      err.httpStatusCode ?? 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};
