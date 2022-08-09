import { Router } from "express";
import {
  add_like,
  delete_like,
} from "../../../controller/like_and_deslike_controller";
import { user_valid } from "../../../middleware/jwt.middleware";

const router = Router();

router.post("/", user_valid, add_like);
router.delete("/", user_valid, delete_like);

export default router;
