import { Router } from "express";
import {
  add_comment,
  get_comment_by_id,
  get_comments_in_video,
  update_comment_by_id,
  delete_comment_by_id,
} from "../../../controller/comments.controller.";
import { user_valid } from "../../../middleware/jwt.middleware";

const router = Router();

router.post("/", user_valid, add_comment);
router.get("/:id", get_comment_by_id);
router.get("/all/:id", get_comments_in_video);
router.put("/:id", user_valid, update_comment_by_id);
router.delete("/:id", user_valid, delete_comment_by_id);

export default router;
