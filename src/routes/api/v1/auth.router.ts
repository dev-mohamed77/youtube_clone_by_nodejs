import { Router } from "express";
import {
  register_controller,
  login,
  login_by_google,
} from "../../../controller/auth.controller";

const router = Router();

router.post("/register", register_controller);
router.post("/login", login);
router.post("/login_by_google", login_by_google);

export default router;
