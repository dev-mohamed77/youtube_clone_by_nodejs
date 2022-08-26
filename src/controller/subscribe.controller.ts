import { prepare_audit } from "../services/audit.services";
import { ApiError } from "../services/error_handler";
import { Logger } from "../services/logger.services";
import { currentDate } from "../utils/common/current_date";
import { HttpStatusCode } from "../utils/enum/http_status_code.enum";
import { SubscriberModel } from "../models/subscriber_model";
import { Request, Response, NextFunction } from "express";
import audit_action from "../config/audit_action_config";

const logger = new Logger("subscriber_controller");

const subscriber = new SubscriberModel();

export const add_subscribe_and_unsubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_from = req.body.user_from;

  try {
    if (!user_from) {
      const message = "user_from is required";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    }

    if (req.body.user.id === user_from) {
      const message = "You cannot subscribe for yourself";
      throw new ApiError(message, HttpStatusCode.BAD_REQUEST, message);
    } else {
      const get_subscription_status = await subscriber.get_subscription_status({
        user_to: req.body.user.id,
        user_from: user_from,
      });

      if (!get_subscription_status.length) {
        const add_subscribe = await subscriber.add_subscribe({
          user_to: req.body.user.id,
          user_from: user_from,
          created_at: currentDate(),
        });

        res.status(200).json({
          status: true,
          result: "Add subscribe successfully",
        });
        logger.infoWithObject("Add subscribe successfully", add_subscribe);
        prepare_audit(
          audit_action.ADD_SUBSCRIBE_AND_UNSUBSCRIBE,
          200,
          add_subscribe,
          null,
          "postman",
          currentDate()
        );
      } else {
        const delete_subscribe = await subscriber.unsubscribe({
          user_to: req.body.user.id,
          user_from: user_from,
        });

        res.status(200).json({
          status: true,
          result: "Unsubscribe successfully",
        });
        logger.infoWithObject("Unsubscribe successfully", delete_subscribe);
        prepare_audit(
          audit_action.ADD_SUBSCRIBE_AND_UNSUBSCRIBE,
          200,
          delete_subscribe,
          null,
          "postman",
          currentDate()
        );
      }
    }
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error add subscribe", err);
    prepare_audit(
      audit_action.ADD_SUBSCRIBE_AND_UNSUBSCRIBE,
      HttpStatusCode.BAD_REQUEST || 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const get_subscribers_count = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await subscriber.get_subscribers_count(req.params.id);

    res.status(200).json({
      status: true,
      result: result,
    });

    logger.infoWithObject("Unsubscribe successfully", result.length);
    prepare_audit(
      audit_action.SUBSCRIBE_NUMBER,
      200,
      result,
      null,
      "postman",
      currentDate()
    );
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error add subscribe", err);
    prepare_audit(
      audit_action.SUBSCRIBE_NUMBER,
      HttpStatusCode.BAD_REQUEST || 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const subscribe_status = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_from = req.body.user_from;
  try {
    const result = await subscriber.get_subscription_status({
      user_to: req.body.user.id,
      user_from: user_from,
    });

    if (!result.length) {
      res.status(200).json({
        status: true,
        result: false,
      });
    } else {
      res.status(200).json({
        status: true,
        result: true,
      });
    }
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error add subscribe", err);
    prepare_audit(
      audit_action.SUBSCRIBE_STATUS,
      HttpStatusCode.BAD_REQUEST || 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};

export const get_subscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  try {
    const result = await subscriber.GET_SUBSCRIPTION_WITH_ID(
      req.body.user.id,
      limit,
      page
    );

    console.log(result);

    res.status(200).json({
      status: true,
      result: result,
    });
  } catch (err) {
    next(err);
    logger.errorWithObject(err.name || "Error add subscribe", err);
    prepare_audit(
      audit_action.SUBSCRIBE_STATUS,
      HttpStatusCode.BAD_REQUEST || 500,
      null,
      err,
      "postman",
      currentDate()
    );
  }
};
