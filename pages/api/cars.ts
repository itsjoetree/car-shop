import { NextApiRequest, NextApiResponse } from "next"
import connectDB from "../../middlware/mongodb"
import CarModel from "../../models/Car"

async function handler(_req: NextApiRequest, res: NextApiResponse) {
    // In the future this application will need to support pagination, so the
    // following line would not be acceptable.
    const cars = await CarModel.find()
    res.status(200).json(cars)
}

export default connectDB(handler)