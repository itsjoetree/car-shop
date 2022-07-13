import { Schema, model, models, Model } from 'mongoose'

export interface ICar {
    _id: string,
    make: string,
    model: string,
    color: string,
    year: number,
    price: number,
    mileage: number,
    rating: number,
    imgName: string
}

export const CarSchema = new Schema({
    make: String,
    model: String,
    color: String,
    year: Number,
    price: Number,
    mileage: Number,
    rating: Number,
    imgName: String
})

const CarModel: Model<ICar> = models.Car || model<ICar>('Car', CarSchema)

export default CarModel