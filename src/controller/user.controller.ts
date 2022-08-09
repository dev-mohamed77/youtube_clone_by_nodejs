import { Request, Response, NextFunction } from "express";
import UserModel from "../models/users_model";
import { ApiError } from "../services/error_handler";
import { currentDate } from "../utils/common/current_date";
import { Logger } from "../services/logger.services";
import { prepare_audit } from "../services/audit.services";
import audit_action from "../config/audit_action_config";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";

const logger = new Logger("user_controller");

const user_model = new UserModel();

export const get_all_users = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await user_model.getAllUser();

    res.status(200).json({
      status: true,
      result: users,
    });
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error get all users", err);
    prepare_audit(
      audit_action.GET_ALL_USERS,
      err.httpStatusCode || 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const get_user_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const user = await user_model.get_user_by_id(id);
    console.log(user);

    res.status(200).json({
      status: true,
      result: user,
    });
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error get user by id", err);
    prepare_audit(
      audit_action.GET_USER_BY_ID,
      err.httpStatusCode || 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const update_user_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fullname = req.body.fullname;
  const image_url = req.body.image_url;
  const gender = req.body.gender;

  if (req.params.id === req.body.user.id) {
    try {
      const update_user = await user_model.update_user_by_id(req.params.id, {
        fullname: fullname,
        image_url: image_url,
        gender: gender,
      });
      res.status(200).json({
        status: true,
        result: update_user,
      });
    } catch (err) {
      next(err);
      logger.errorWithObject(err.name || "Error get user by id", err);
      prepare_audit(
        audit_action.UPDATE_USER_BY_ID,
        err.httpStatusCode || 500,
        null,
        err,
        "postman",
        currentDate()
      );
    }
  } else {
    const message = "You can update only your account!";
    res.status(400).json({
      status: false,
      result: message,
    });
  }
};

export const delete_user_by_id = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id === req.body.user.id) {
    try {
      const delete_user = await user_model.delete_user_by_id(req.params.id);
      console.log(delete_user);
      res.status(200).json({
        status: true,
        result: "User delete successfully",
      });
    } catch (err) {
      next(err);
      logger.errorWithObject(err.name || "Error delete user by id", err);
      prepare_audit(
        audit_action.DELETE_USER_BY_ID,
        err.httpStatusCode || 500,
        null,
        err,
        "postman",
        currentDate()
      );
    }
  } else {
    const message = "You can delete only your account!";
    res.status(400).json({
      status: false,
      result: message,
    });
  }
};
