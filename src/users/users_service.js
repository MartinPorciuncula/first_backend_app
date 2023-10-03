import User from "./users.model.js";

export class UserServices {
  async findAllUsers() {
    return await User.findAll({
      where: {
        id,
        status: true,
      },
    });
  }
  async findOneUser(id) {
    return await User.findOne({
      where: {
        id,
        status: true,
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
    return await User.update({ status: disabled });
  }
}
