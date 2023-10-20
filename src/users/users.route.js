import { Router } from "express";
import {login,register} from "./users.controller.js"
import {
 findAllUsers,
 createUser,
  findOneUser,
  updateUser ,
  deleteUser,
} from "./users.controller.js";

import { ValidateExistingUser } from "./users.middleware.js";

export const router = Router();

router.post('/login', login)
router.post("/register",register)

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