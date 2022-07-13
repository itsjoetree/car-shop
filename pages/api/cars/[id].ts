import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from "../../../middlware/mongodb"
import CarModel from "../../../models/Car"

async function carHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case 'GET':
            const car = await CarModel.findById(id)
            res.status(200).json(car)
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default connectDB(carHandler)