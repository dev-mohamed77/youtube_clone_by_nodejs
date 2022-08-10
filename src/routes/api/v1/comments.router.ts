import { Router } from "express";

const router = Router();

import {
  add_comment,
  get_comment_by_id,
  get_comments_in_video,
  update_comment_by_id,
  delete_comment_by_id,
} from "../../../controller/comments.controller.";

router.post("/", add_comment);
router.get("/:id", get_comment_by_id);
router.get("all/:id", get_comments_in_video);
router.put("/:id", update_comment_by_id);
router.delete("/:id", delete_comment_by_id);

export default router;
