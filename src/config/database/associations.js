import User from "../../users/users.model.js";
import Repairs from "../../repairs/repairs.model.js";


export const associations = () =>{

    User.hasMany(Repairs, {foreignKey: "User_Id", as: "userCreateRepair"})
    Repairs.belongsTo(User, {foreignKey: "User_Id", as: ""})
}