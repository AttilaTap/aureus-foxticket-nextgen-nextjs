import express from "express";
import getEvents from "../controllers/event-controller.js";
import getEventById from "../controllers/event-id-controller.js";

const router = express.Router();

router.get("/events", getEvents);
router.get("/events/:eventId", getEventById);

export default router;
