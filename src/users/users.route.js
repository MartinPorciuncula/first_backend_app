import { Router } from "express";
import { login, register } from "./users.controller.js";
import { changePassword } from "./users.controller.js";
import { protect } from "./users.middleware.js";
import {
  findAllUsers,
  createUser,
  findOneUser,
  updateUser,
  deleteUser,
} from "./users.controller.js";

import { ValidateExistingUser } from "./users.middleware.js";

export const router = Router();

router.post("/login", login);
router.post("/register", register);
router.use(protect);
router.patch("/change-password", changePassword);

router.route("/").get(protect, findAllUsers).post(createUser);

router
  .use("/:id", ValidateExistingUser)
  .route("/:id")
  .get(findOneUser)
  .patch(updateUser)
  .delete(deleteUser);
