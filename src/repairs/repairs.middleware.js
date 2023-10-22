import { AppError } from "../errors/appError.js";
import { RepairService } from "./repairs_service.js";

const repairService = new RepairService()

export const validatingStatusPending = async (req,res,next) => {
    const { id } = req.params

    const repair = await repairService.findOneRepair(id)

    if (!repair) {
        return next(new AppError(`Repair whit id ${id} not found`,404))
    }
    req.repair = repair
    next()
}