import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import getServerPort from "./helper.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${getServerPort()}`,
      },
    ],
  },
  apis: ["./routes/*-routes.js"],
};
const swaggerSpec = swaggerJSDoc(options);

export default function swaggerDocs(app, port) {
  //swagger page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/api-docs`);
}
