import {UserServices } from "./users_service.js"

const userservice = new UserServices()

export const findAllUsers = async (_,res) =>{
    try {
        const users = await userservice.findAllUsers()
        return res.json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createUser = async (req, res) => {
  try {
      const user = await userservice.createUser(req.body)
      return res.status(201).json(user)
  } catch (error) {
      return res.status(500).json(error)
  }
}


export const findOneUser = async (req,res) =>{
    try {
        const {id} = req.params

        const user = await userservice.findOneUser(id)
        if(!user)
        return res.status(404).json({
     status:error,
     message:`User with id: ${id} not found`
        })
        return res.json(user)
    } catch (error) {
      return res.status(500).json(error)
    }
}

export const updateUser = async(req, res) => {
    try {  
      const { id } = req.params;
      
      const user = await userservice.findOneUser(id)
      
  
      if(!user){
        return res.status(404).json({
          status: 'error',
          message: `passenger with id ${ id } not found`
        })
      }
      const updatedUser = await userservice.updateUser(user, req.body)
      return res.json(updatedUser)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  
  export const deleteUser = async(req, res) => {
    try {
      const { id } = req.params;
  
      const user = await userservice.findOneUser(id)
  
      if(!user){
        return res.status(404).json({
          status: 'error',
          message: `Passenger with id ${id} not found`
        })
      }
      
      await userservice.deleteUser(user)
      
      return res.status(204).json(null)
    } catch (error) {
      return res.status(500).json(error)
    }
  }