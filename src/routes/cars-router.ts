// @ts-nocheck
import { Router } from "express";
import { create, show, showById, update, remove } from "../controllers/cars-controller";

const router = Router();

router.route("/cars").post(create); 
router.route("/cars").get(show);
router.route("/cars/:id").get(showById);
router.route("/cars/:id").patch(update);
router.route("/cars/:id").delete(remove);

export default router;
