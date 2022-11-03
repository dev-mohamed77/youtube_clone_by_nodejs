import { Router } from "express";
import {
  add_subscribe,
  get_subscribers_count,
  subscribe_status,
  get_subscriptions,
  unsubscribe,
} from "../../../controller/subscribe.controller";
import { user_valid } from "../../../middleware/jwt.middleware";

const router = Router();

router.post("/", user_valid, add_subscribe);
router.delete("/", user_valid, unsubscribe);
router.get("/subscribe_status/:user_id", user_valid, subscribe_status);
router.get("/get_subscriptions", user_valid, get_subscriptions);
router.get("/:id", get_subscribers_count);

export default router;
