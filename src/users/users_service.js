import User from "./users.model.js";

export class UserServices {
  async findAllUsers() {
    return await User.findAll({
      where: {
        status: "available",
      },
    });
  }
  async findOneUser(id) {
    return await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
  }
  async createUser(data) {
    return await User.create(data);
  }
  async updateUser(User, data) {
    return await User.update(data);
  }
  async deleteUser(User) {
    return await User.update({ status: "disabled" });
  }

  async createRegisterUser(data){
  return await User.create(data)
  }

  async findOneByEmail(email){
  return User.findOne({
    where: {
       email,
       status: "available"
    }
  })
  }

  
  
}


