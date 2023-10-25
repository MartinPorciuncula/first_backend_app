import { AppError } from "../errors/appError.js";
import { catchAsync } from "../errors/catchAsync.js";
import { RepairService } from "./repairs_service.js";

const repairService = new RepairService();

export const validatingStatusPending = async (req, res, next) => {
  const { id } = req.params;

  const repair = await repairService.findOneRepair(id);

  if (!repair) {
    return res.status(404).json({
      status: "error",
      message: `Repair whit id ${id} not found`,
    });
  }

  req.repair = repair;

  next();
};
