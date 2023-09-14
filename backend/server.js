import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";
import testRoutes from "./routes/test-routes.js";
import eventRoutes from "./routes/event-routes.js";
import ticketRoutes from "./routes/ticket-routes.js";
import swaggerDocs from "./utils/api-docs.js";
import * as serverHelper from "./utils/helper.js";
import userRoutes from "./routes/user-routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", authRoutes);
app.use("/users", userRoutes);
app.use("/", eventRoutes);
app.use("/", ticketRoutes);
app.use("/", testRoutes);

const portToUse = serverHelper.getServerPort();

const server = app.listen(portToUse, () => {
  console.log(`I'm running on : ${portToUse}`);
  swaggerDocs(app, portToUse);
});
