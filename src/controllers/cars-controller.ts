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

export const show = async (req: Request, res: Response): Promise<Response> => {
  try {
    //1. Deve ser possível buscar por query params (?page=1&limit=2&brand=vol&model=gol&year=2015).
    const page = parseInt(req.query.page as string) || 1; 
    const limit = parseInt(req.query.limit as string) || 5; 
    const { brand, model, year } = req.query; 

    const cars = await showCars(page, limit, { brand, model, year });
    
    //7. Se não houver resultados, deve retornar status 204 (sem conteúdo).
    if (cars.count === 0) {
        return res.status(204).send(); 
    }

    /*
    8. Se houver resultados, deve retornar status 200 com um objeto JSON contendo os campos:
      a. count: Quantidade total de carros de acordo com os filtros.
      b. pages: Quantidade total de páginas de acordo com o resultado do count e o limit enviado.
      c. data: A lista de carros encontrados, ou seja, um array de objetos contendo id, brand, model, year e items.
    */
    return res.status(200).json(cars); // Retornando os dados
  } catch (error: unknown) {
    if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const showById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  
  try {
    // 1. Se o carro for encontrado, deve retornar status 200 com os dados do carro.
    const car = await getCarById(id);
    return res.status(200).json(car);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const update = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  
  try {
    //5. Se o carro for atualizado com sucesso deve retornar status 204 sem conteúdo
    await updateCar(id, req.body);
    return res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      const statusCode = (error as any).status || 400;
      return res.status(statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  
  try {
    //1. Se o carro for excluído com sucesso, deve retornar status 204 sem conteúdo.
    await deleteCar(id);
    return res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      const statusCode = (error as any).status || 400;
      return res.status(statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
