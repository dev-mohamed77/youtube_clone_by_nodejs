import { Router } from "express";
import {
  get_all_users,
  get_user_by_id,
  update_user,
} from "../../../controller/user.controller";
import { user_valid } from "../../../middleware/jwt.middleware";

const router = Router();

router.get("/", get_all_users);
router.get("/:id", get_user_by_id);
router.put("/:id", user_valid, update_user);

export default router;
