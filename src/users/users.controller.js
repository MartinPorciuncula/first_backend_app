import { UserServices } from "./users_service.js";
import {
  validateLogin,
  validatePartialUser,
  validateRegister,
  validateUser,
} from "./users.schema.js";
import generateJWT from "../plugins/generate-jwt-plugin.js"
import { encryptedPassword, verifyPassword } from "../plugins/encrypted-password-plugin.js";
import { AppError } from "../errors/appError.js";

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

export const findOneUser = async (req, res,next) => {
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
  try {
    const {hasError,errorMessages,userData} = validateLogin(req.body)

    if(hasError){
      return res.status(422).json({
        status: "error",
        message: errorMessages
      })
     }
     const user = await userService.findOneByEmail(userData.email)

     if(!user){
      return next(new AppError("This account does not exist :(",404))
     }

     const isCorrectPassword = await verifyPassword(
      userData.password, user.password
     )

     if (!isCorrectPassword){
       return res.status(401).json({
        status: "error",
        message:"Incorrect email or password"
       })
     }

     const token = await generateJWT(user.id)

     return res.status(201).json({
      token,
      user :{
        id: user.id,
        name : user.name,
        email: user.email,
        role: user.role
      }
  })

  } catch (error) {
    
  }

}

export const register = async (req, res) => {
  try {
  const { hasError, errorMessages, userData } = validatePartialUser(req.body)
 
   if(hasError){
    return res.status(422).json({
      status: "error",
      message: errorMessages
    })
   }
 

    const user = await userService.createRegisterUser(userData);

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user :{
          id: user.id,
          name : user.name,
          email: user.email,
          role: user.role
        }
    })
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const changePassword = async (req, res) => {

  try {
      const { sessionUser } = req;


      const { currentPassword, newPassword } = req.body;

      if (currentPassword === newPassword) {
          return next (new AppError('The password canont be equals',400))
      }

      const isCorrectPassword = await verifyPassword(
          currentPassword,
          sessionUser.password
      )

      if (!isCorrectPassword) {
          return next(new AppError('Incorrect email or password',401))
      }

      const hashedNewPassword = await encryptedPassword(newPassword)

      await userService.updatePassword(sessionUser, {
          password: hashedNewPassword
      })

      return res.status(200).json({
          message: 'The user password was updated succesfully'
      })
  } catch (error) {
      return res.status(500).json(error)
  }
}