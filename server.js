import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import dbConnect from "./src/config/dbConnect.js";
import router from "./src/router/api/v1/index.js";

import importJSONData from "./src/utils/import.js";

dotenv.config();

dbConnect();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 5000;

console.log(HOST, PORT);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get('/import', async (req, res) => {
    await importJSONData(); // Replace with your file path
    res.send('Data imported successfully!');
});

app.use("/api/v1", router);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})