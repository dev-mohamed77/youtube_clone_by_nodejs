import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/users_model";
import { ApiError } from "../services/error_handler";
import { currentDate } from "../utils/common/current_date";
import { password_validator } from "../utils/common/validate";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";
import { Logger } from "../services/logger.services";
import { prepare_audit } from "../services/audit.services";
import audit_action from "../config/audit_action_config";
import { jwt_sign } from "../middleware/jwt.middleware";

const logger = new Logger("auth_controller");

const user_model = new UserModel();

export const register_controller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fullname = req.body.fullname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const created_at = currentDate();

  try {
    //check require
    if (!fullname || !username || !email || !password) {
      const message = "fullname , username , email and password are required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    // check user exist by username or email
    const check_username_or_email =
      await user_model.get_user_by_username_and_email(username, email);

    if (check_username_or_email.length) {
      const message = "username or email are exist";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    if (!password_validator(password)) {
      const message =
        "The password must contain large letters, small letters and numbers.";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const hash = await bcrypt.hash(password, 10);

    const create_user = await user_model.add_user(
      {
        fullname: fullname,
        username: username,
        email: email,
        password: hash,
        created_at: created_at,
      },
      true
    );

    res.status(200).json({
      status: true,
      result: "User has been added successfully",
    });
    logger.infoWithObject("User has been added successfully", create_user);
    prepare_audit(
      audit_action.USER_REGISTER,
      200,
      create_user,
      null,
      "postman",
      created_at
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error Register user", err);
    prepare_audit(
      audit_action.USER_REGISTER,
      err.httpStatusCode || 500,
      null,
      err,
      "postman",
      created_at
    );
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      const message = "username and password is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const user = await user_model.get_user_by_username(username);

    if (!user.length) {
      const message = "Wrong username";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const encodedPassword = await bcrypt.compare(
      password,
      user[0].users_password
    );

    if (!encodedPassword) {
      const message = "Wrong password";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const token = jwt_sign({
      id: user[0].users_id,
      username: user[0].users_username,
      email: user[0].users_email,
    });

    const result = {
      id: user[0].users_id,
      fullname: user[0].users_fullname,
      username: user[0].users_username,
      email: user[0].users_email,
      image_url: user[0].users_image_url,
      gender: user[0].users_gender,
      is_google: user[0].users_is_google,
      created_at: user[0].users_created_at,
      updated_at: user[0].users_update_at,
      token: token,
    };

    res.status(200).json({
      status: true,
      result: result,
    });

    logger.infoWithObject("User Login successfully", result);
    prepare_audit(
      audit_action.USER_REGISTER,
      200,
      result,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error Register user", err);
    prepare_audit(
      audit_action.USER_LOGIN,
      err.httpStatusCode || 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const login_by_google = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fullname = req.body.fullname;
  const username = req.body.username;
  const email = req.body.email;

  try {
    if (!username || !email || !fullname) {
      const message = "username and email is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    const user = await user_model.get_user_by_email(email);

    if (user.length) {
      const token = jwt_sign({
        id: user[0].users_id,
        username: user[0].users_username,
        email: user[0].users_email,
      });
      const result = {
        id: user[0].users_id,
        fullname: user[0].users_fullname,
        username: user[0].users_username,
        email: user[0].users_email,
        image_url: user[0].users_image_url,
        gender: user[0].users_gender,
        is_google: user[0].users_is_google,
        created_at: user[0].users_created_at,
        updated_at: user[0].users_update_at,
        token: token,
      };

      res.status(200).json({
        status: true,
        result: result,
      });
    } else {
      const create_user = await user_model.add_user(
        {
          fullname: fullname,
          username: username,
          email: email,
          created_at: currentDate(),
        },
        false
      );

      const token_register = jwt_sign({
        id: create_user.users_id,
        username: create_user.users_username,
        email: create_user.users_email,
      });
      const result_register = {
        id: create_user.users_id,
        fullname: create_user.users_fullname,
        username: create_user.users_username,
        email: create_user.users_email,
        image_url: create_user.users_image_url,
        gender: create_user.users_gender,
        is_google: create_user.users_is_google,
        created_at: create_user.users_created_at,
        updated_at: create_user.users_update_at,
        token: token_register,
      };

      res.status(200).json({
        status: true,
        result: result_register,
      });
    }
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error Login by google", err);
    prepare_audit(
      audit_action.USER_LOGIN_BY_GOOGLE,
      err.httpStatusCode || 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};
