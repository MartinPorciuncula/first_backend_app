import { UserServices } from "./users_service.js";

const userService = new UserServices()

export const ValidateExistingUser = async (req,res,next) => {
    const { id } = req.params;
      
      const user = await userService.findOneUser(id)
      
  
      if(!user){
        return res.status(404).json({
          status: 'error',
          message: `passenger with id ${ id } not found`
        })
      }

     req.user = user
      next()
}