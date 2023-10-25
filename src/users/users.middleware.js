import { envs } from "../config/enviroments/enviroments.js";
import { AppError } from "../errors/appError.js";
import { catchAsync } from "../errors/index.js";
import { UserServices } from "./users_service.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const userService = new UserServices();

export const ValidateExistingUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findOneUser(id);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: `User whit id ${id} not found`,
    });
  }

  req.user = user;

  next();
};

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    returnnext(
      new AppError("You are not logged in,please log in to continue <3", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWD_SEED);

  const user = await userService.findOneUser(decoded.id);

  if (!user) {
    return next(
      new AppError("This owner of this token is not longer available :(", 401)
    );
  }

  req.sessionUser = user;
  next();
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
