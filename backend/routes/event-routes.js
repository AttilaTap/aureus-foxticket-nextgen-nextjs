import express from "express";
import { getEventById, getEvents } from "../controllers/event-controller.js";

const router = express.Router();

router.get("/events", getEvents);
router.get("/event/:eventId", getEventById);

export default router;
