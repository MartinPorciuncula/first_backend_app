import { validatePartialRepair, validateRepair } from "./repairs.schema.js"
import { RepairService } from "./repairs_service.js"

const repairService = new RepairService()

export const findPending = async (_, res) => {

    try {
        const repair = await repairService.findPending()
        return res.json(repair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const createRepair = async (req, res) => {

    try {

        const { hasError, errorMessages, repairData } = validateRepair(req.body)

        if (hasError) {
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }

        const repair = await repairService.createRepair(req.body)

        return res.status(201).json(repair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const findOne = async (req, res) => {

    try {
        const {repair} = req;

        return res.json(repair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateRepair = async (req, res) => {
    try {

        const { hasError, errorMessages, dataRepair } = validatePartialRepair(req.body)

        if (hasError) {
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }     

       const {repair} = req;

        const updateRepair = await repairService.updateRepair(repair, dataRepair)

        return res.json(updateRepair)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteRepair = async (req, res) => {
    try {
        

        const {repair} = req;

        await repairService.deleteRepair(repair)

        return res.status(204).json()
    } catch (error) {
        return res.status(500).json(error)
    }
}