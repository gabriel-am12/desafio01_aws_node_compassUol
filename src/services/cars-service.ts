import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CarInput {
    brand: string;
    model: string;
    year: number;
    items: string[];
  }

export const createCar = async (data: CarInput) => {
  const { brand, model, year, items } = data;

  // 1. Todos os campos são obrigatórios
  if (!brand) throw new Error("brand is required");
  if (!model) throw new Error("model is required");
  if (!year) throw new Error("year is required");
  if (!items || items.length === 0) throw new Error("items are required");

  // 2. Só serão aceitos carros com até 10 anos. Exemplo: Período entre 2015 e 2025 (pode ser feito de forma dinâmica considerando o ano atual).
  const currentYear = new Date().getFullYear();
  if (year < currentYear - 10 || year > currentYear) {
    throw new Error("year should be between 2015 and 2025");
  }

  // 4.Não pode ser salvo um carro que já exista, considerando marca, modelo e ano.
  const existingCar = await prisma.cars.findFirst({
    where: {
      brand,
      model,
      year,
    },
  });

  if (existingCar) {
    const error = new Error("there is already a car with this data");
    (error as any).status = 409; 
    throw error;
  }

  // 3. Não podem ser salvos itens repetidos.
  const car = await prisma.cars.create({
    data: {
      brand,
      model,
      year,
      items: {
        create: [...new Set(items)].map((item) => ({ name: item })),
      },
    },
  });

  return car;
};
