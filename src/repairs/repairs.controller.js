import { validatePartialRepair, validateRepair } from "./repairs.schema.js";
import { RepairService } from "./repairs_service.js";
import { catchAsync } from "../errors/catchAsync.js";
const repairService = new RepairService();

export const findPending = catchAsync(async (_, res) => {
  const repair = await repairService.findAllWithAllData();
  return res.json(repair);
});

export const createRepair = catchAsync(async (req, res) => {
  const { hasError, errorMessages, repairData } = validateRepair(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const repair = await repairService.createRepair(req.body);

  return res.status(201).json(repair);
});

export const findOne = catchAsync(async (req, res) => {
  const { id } = req.params;

  const repair = await repairService.findOneRepair(id);

  return res.json(repair);
});

export const updateRepair = catchAsync(async (req, res) => {
  const { hasError, errorMessages, dataRepair } = validatePartialRepair(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const { repair } = req;

  const updatedRepair = await repairService.updateRepair(repair, dataRepair);

  return res.json(updatedRepair);
});

export const deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repairService.deleteRepair(repair);

  return res.status(204).json();
});
