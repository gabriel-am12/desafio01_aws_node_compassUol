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

export const showCars = async (page: number, limit: number, filters: any) => {
  const { brand, model, year } = filters;
  /*
  3. Deve ter um limite (limit) da lista de carros de no mínimo 1 e no máximo 10.
  4. Se o limite (limit) não for enviado ou for abaixo de 1, o valor padrão será 
  5.Se o limite (limit) enviado for maior que 10 deve considerar valor 10.
  */
  if (limit < 1) limit = 5; 
  if (limit > 10) limit = 10; 
  
  /*
  6. Filtros opcionais incluem: brand, model e year.
    a. brand: Pesquisar por parte do nome da marca
    b. model: Pesquisar por parte do nome do modelo
    c. year: Pesquisar por carros com anos a partir do valor enviado
  */
  const where: any = {};
  if (brand) {
    where.brand = {
        contains: brand,
        //mode: 'insensitive', 
    };
  }

  if (model) {
    where.model = {
        contains: model,
        //mode: 'insensitive',
    };
  }

  if (year) {
    where.year = {
      gte: Number(year)
    }
  }

  const totalCars = await prisma.cars.count({ where });
  const cars = await prisma.cars.findMany({
    where,
    //2. A listagem deve ser paginada (page: Número da página dos resultados).
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalPages = Math.ceil(totalCars / limit);

  return {
    count: totalCars,
    pages: totalPages,
    data: cars,
  };
};

export const getCarById = async (id: number) => {
  const car = await prisma.cars.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!car) {
    //2. Caso contrário, deve retornar status 404 com a mensagem “car not found”.
    throw new Error("car not found");
  }

  return car;
};
