import express, { Express, Request, Response, Application } from 'express';
import dotenv from "dotenv";
import router from "./routes/cars-router";
import cors from "cors";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use('/api/v1',router);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


