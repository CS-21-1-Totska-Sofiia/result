import express from "express";
import router from './router.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 3010;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT || PORT, () => {
    console.log("Server listens on port", process.env.PORT || PORT);
})