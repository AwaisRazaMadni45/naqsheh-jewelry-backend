import express from "express";
import { subscribeNewsletter, getAllSubscribers } from "../controllers/newsletterController.js";

const newsletterRoutes = express.Router();

newsletterRoutes.post("/", subscribeNewsletter);
newsletterRoutes.get("/", getAllSubscribers);

export default newsletterRoutes;