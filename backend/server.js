import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";
import testRoutes from "./routes/test-routes.js";
import eventRoutes from "./routes/event-routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", authRoutes);
app.use("/", testRoutes);
app.use("/", eventRoutes);

const defaultPort = 9000;
const envPort = process.env.PORT;
const portToUse = envPort === undefined ? defaultPort : envPort;
const server = app.listen(portToUse, () => {
  console.log(`I'm running on : ${portToUse}`);
});

export { app, server };
