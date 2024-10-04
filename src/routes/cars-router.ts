import { Router } from "express";
import { create, show, showById, update, remove } from "../controllers/cars-controller";

const router = Router();

router.route("/cars").post(create); 
