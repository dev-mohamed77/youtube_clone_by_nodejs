import { Router } from "express";
import {
  add_view,
  create_videos,
  delete_video_by_id,
  get_videos,
  get_videos_random,
  get_video_by_id,
  sub,
  trend,
  update_video_by_id,
} from "../../../controller/videos.controller";
import { user_valid } from "../../../middleware/jwt.middleware";

const router = Router();

router.post("/", user_valid, create_videos);
router.get("/all", get_videos);
router.get("/", get_videos_random);
router.get("/:id", get_video_by_id);
router.put("/:id", user_valid, update_video_by_id);
router.delete("/:id", user_valid, delete_video_by_id);
router.put("/add_view/:id", add_view);
router.get("/trend", trend);
router.get("/sub", sub);

export default router;
