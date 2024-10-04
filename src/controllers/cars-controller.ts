import { Request, Response } from "express";
import {
  createCar,
  showCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../services/cars-service";

export const create = async (req: Request, res: Response)=> {
  try {
    //5. Se o carro for criado com sucesso deve ser retornado status 201 e um JSON contendo o id gerado { “id”: 1 }
    const car = await createCar(req.body);
    return res.status(201).json({ id: car.id });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const statusCode = (error as any).status || 400;
      return res.status(statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
