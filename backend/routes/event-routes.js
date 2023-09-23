import express from "express";
import * as eventControllerFile from "../controllers/event-controller.js";

const router = express.Router();
let eventController = new eventControllerFile.EventController();

{
  router.get("/events", eventController.getEvents);
  router.get("/event/:eventId", eventController.getEventById);
}

export default router;
