import { UserServices } from "./users_service.js";
import {
  validatePartialUser,
  validateRegister,
  validateUser,
} from "./users.schema.js";

const userService = new UserServices();

export const findAllUsers = async (_, res) => {
  try {
    const users = await userService.findAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
 
  const { hasError, errorMessages, passengerData } = validatePartialUser(req.body)
 
   if(hasError){
    return res.status(422).json({
      status: "error",
      message: errorMessages
    })
   }
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneUser = async (req, res) => {
  try {
    const { user } = req;
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
 
  const { hasError, errorMessages, passengerData } = validatePartialUser(req.body)
 
   if(hasError){
    return res.status(422).json({
      status: "error",
      message: errorMessages
    })
   }


  try {
    const { user } = req;

    const updatedUser = await userService.updateUser(user, req.body);
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await userService.deleteUser(user);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const login = async(req,res) => {

}

export const register = async (req, res) => {
 
  const { hasError, errorMessages, userData } = validatePartialUser(req.body)
 
   if(hasError){
    return res.status(422).json({
      status: "error",
      message: errorMessages
    })
   }
  try {
    const user = await userService.createRegisterUser(userData);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
