import { Router } from "express";
import {
  add_desLike,
  delete_desLike,
} from "../../../controller/like_and_deslike_controller";
import { user_valid } from "../../../middleware/jwt.middleware";

const router = Router();

router.post("/", user_valid, add_desLike);
router.delete("/", user_valid, delete_desLike);

export default router;
