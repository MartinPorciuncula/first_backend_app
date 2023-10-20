import { Router } from "express";
import { createRepair, findOne, findPending } from "./repairs.controller.js";

import { validatingStatusPending } from "./repairs.middleware.js";

export const router = Router();

router.route("/")
.get(findPending)
.post(createRepair);

router
.use("/:id", validatingStatusPending)
.route("/:id")
.get(findOne);
