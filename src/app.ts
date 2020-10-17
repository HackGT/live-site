import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;

export let app = express();

app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(cors());

// Throw and show a stack trace on an unhandled Promise rejection instead of logging an unhelpful warning
process.on("unhandledRejection", err => {
    throw err;
});

import { isAuthenticated } from "./auth/auth";
import { authRoutes } from "./routes/auth";
import { eventRoutes } from "./routes/event";

app.get("/", (req, res) => {
    res.status(200).send("Please provide a valid URL");
});

app.get("/status", (req, res) => {
    res.status(200).send("Success");
});

app.use("/auth", authRoutes);
app.use("/event", isAuthenticated, eventRoutes);


app.get("*", (req, res) => {
    res.status(404).send("Sorry :( this is an invalid url");
})

app.listen(process.env.PORT, () => {
    console.log(`Virtual Check-in system v${VERSION_NUMBER} started on port ${process.env.PORT}`);
});
