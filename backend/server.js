import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";
import testRoutes from "./routes/test-routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", authRoutes);
app.use("/", testRoutes);

const server = app.listen(9000, () => {
  console.log("I'm running");
});

export { app, server };
