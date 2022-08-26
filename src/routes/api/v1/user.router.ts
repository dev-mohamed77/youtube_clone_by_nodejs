import { Router } from "express";
import {
  delete_user_by_id,
  get_all_users,
  get_user_by_id,
  update_user_by_id,
} from "../../../controller/user.controller";
import { user_valid } from "../../../middleware/jwt.middleware";
import { upload_image } from "../../../services/multer.services";

const router = Router();

router.get("/", get_all_users);
router.get("/:id", user_valid, get_user_by_id);
router.put("/:id", upload_image, user_valid, update_user_by_id);
router.delete("/:id", user_valid, delete_user_by_id);

export default router;
