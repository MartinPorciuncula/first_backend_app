import { Router } from "express";

import {
 findAllUsers,
 createUser,
  findOneUser,
  updateUser ,
  deleteUser,
} from "./users.controller.js";

import { ValidateExistingUser } from "./users.middleware.js";

export const router = Router();

router
  .route("/")
  .get(findAllUsers)
  .post(createUser);

router
  .use("/:id",ValidateExistingUser)
  .route("/:id")
  .get(findOneUser)
  .patch(updateUser)
  .delete(deleteUser)