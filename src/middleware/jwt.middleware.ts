import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";

export const user_valid = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(" ")[1];

    jwt.verify(token, config.jwt_secret as string, (err, user) => {
      if (err) {
        res.status(200).json({ status: false, result: "Token is valid" });
      } else {
        req.body.user = user;
        next();
      }
    });
  } else {
    res.status(400).json({
      status: false,
      result: "You are not authenticated",
    });
  }
};

export const jwt_sign = (payload: object) => {
  return jwt.sign(payload, config.jwt_secret as string, { expiresIn: "3d" });
};
