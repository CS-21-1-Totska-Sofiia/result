import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import router from './router.js';
import cors from 'cors';

import {setup} from "./utils/setup.js";

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
await setup();

app.get('/', (req, res) => {
    res.status(200).json({msg: "Root route"});
});

app.listen(process.env.PORT | PORT, () => {
    console.log("Server listens on port", PORT);
});