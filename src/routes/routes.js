import { Router } from "express";
import { router as usersRouter } from "../users/users.route.js";
import { router as repairsRouter } from "../repairs/repairs.route.js";

export const router = Router();

router.use("/users", usersRouter);
router.use("/repairs", repairsRouter);
