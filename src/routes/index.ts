import { Router } from "express";
import auth_router_v1 from "./api/v1/auth.router";
import user_router from "./api/v1/user.router";

const router = Router();

router.use("/auth", auth_router_v1);
router.use("/users", user_router);

export default router;
