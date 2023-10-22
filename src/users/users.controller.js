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
import { catchAsync } from "../errors/catchAsync.js";
const userService = new UserServices();

export const findAllUsers = catchAsync(async (_, res) => {
 
    const users = await userService.findAllUsers();
    return res.json(users);
  
})

export const createUser = catchAsync(async (req, res) => {
 
  const { hasError, errorMessages, passengerData } = validatePartialUser(req.body)
 
   if(hasError){
    return res.status(422).json({
      status: "error",
      message: errorMessages
    })
   }
 
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
 
});

export const findOneUser = catchAsync(async (req, res,next) => {
    const { user } = req;
    return res.json(user);
});

export const updateUser = catchAsync(async(req, res) => {
 
  const { hasError, errorMessages, passengerData } = validatePartialUser(req.body)
 
   if(hasError){
    return res.status(422).json({
      status: "error",
      message: errorMessages
    })
   }
    const { user } = req;
    const updatedUser = await userService.updateUser(user, req.body);
    return res.json(updatedUser);
  
});

export const deleteUser = catchAsync(async (req, res) => {

    const { user } = req;

    await userService.deleteUser(user);

    return res.status(204).json(null);

});

export const login = catchAsync(async(req,res) => {

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
       return next(new AppError("Incorrect email or password"))
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

})

export const register = catchAsync(async (req, res) => {
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
});

export const changePassword = catchAsync(async (req, res) => {
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
})