// @ts-nocheck
import { Router } from "express";
import { create, show, showById, update, remove } from "../controllers/cars-controller";

const router = Router();

/**
 * @swagger
 * /api/v1/cars:
 *   post:
 *     summary: Cria um novo carro
 *     description: Adiciona um carro à base de dados.
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - model
 *               - year
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *                 example: 2021
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Carro criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 brand:
 *                   type: string
 *                 model:
 *                   type: string
 *                 year:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Erro na validação dos dados fornecidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "brand is required"
 *       409:
 *         description: Conflito com dados existentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "there is already a car with this data"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "internal server error"
 */
router.route("/cars").post(create);

/**
 * @swagger
 * /api/v1/cars:
 *   get:
 *     summary: Lista todos os carros
 *     description: Retorna uma lista de carros cadastrados.
 *     tags: [Cars]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: brand
 *         required: false
 *         schema:
 *           type: string
 *           example: "Volkswagen"
 *       - in: query
 *         name: model
 *         required: false
 *         schema:
 *           type: string
 *           example: "GOL"
 *       - in: query
 *         name: year
 *         required: false
 *         schema:
 *           type: integer
 *           example: 2021
 *     responses:
 *       200:
 *         description: Lista de carros retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total de carros encontrados.
 *                 pages:
 *                   type: integer
 *                   description: Total de páginas.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       brand:
 *                         type: string
 *                       model:
 *                         type: string
 *                       year:
 *                         type: integer
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *       204:
 *         description: Não há carros cadastrados.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "internal server error"
 */
router.route("/cars").get(show);

/**
 * @swagger
 * /api/v1/cars/{id}:
 *   get:
 *     summary: Busca um carro por ID
 *     description: Retorna os detalhes de um carro cadastrado pelo seu ID.
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Carro encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 brand:
 *                   type: string
 *                 model:
 *                   type: string
 *                 year:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Carro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "car not found"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "internal server error"
 */
router.route("/cars/:id").get(showById);

/**
 * @swagger
 * /api/v1/cars/{id}:
 *   patch:
 *     summary: Atualiza um carro existente
 *     description: Atualiza os detalhes de um carro cadastrado pelo seu ID.
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       204:
 *         description: Carro atualizado com sucesso.
 *       404:
 *         description: Carro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "car not found"
 *       409:
 *         description: Conflito com dados existentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "there is already a car with this data"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "internal server error"
 */
router.route("/cars/:id").patch(update);

/**
 * @swagger
 * /api/v1/cars/{id}:
 *   delete:
 *     summary: Exclui um carro
 *     description: Remove um carro cadastrado pelo seu ID.
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Carro excluído com sucesso.
 *       404:
 *         description: Carro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "car not found"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "internal server error"
 */
router.route("/cars/:id").delete(remove);

export default router;
