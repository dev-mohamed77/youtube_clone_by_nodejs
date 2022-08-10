import { Router } from "express";
import auth_router_v1 from "./api/v1/auth.router";
import user_router from "./api/v1/user.router";
import videos_router from "./api/v1/videos.router";
import like_router from "./api/v1/like.router";
import desLike_router from "./api/v1/deslike.router";
import comments_router from "../routes/api/v1/comments.router";

const router = Router();

router.use("/auth", auth_router_v1);
router.use("/users", user_router);
router.use("/videos", videos_router);
router.use("/comments", comments_router);
router.use("/likes", like_router);
router.use("/deslikes", desLike_router);

export default router;
