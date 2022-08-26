import { Router } from "express";
import {
  add_subscribe_and_unsubscribe,
  get_subscribers_count,
  subscribe_status,
  get_subscriptions,
} from "../../../controller/subscribe.controller";
import { user_valid } from "../../../middleware/jwt.middleware";

const router = Router();

router.post("/", user_valid, add_subscribe_and_unsubscribe);
router.get("/subscribe_status", user_valid, subscribe_status);
router.get("/get_subscriptions", user_valid, get_subscriptions);
router.get("/:id", get_subscribers_count);

export default router;
