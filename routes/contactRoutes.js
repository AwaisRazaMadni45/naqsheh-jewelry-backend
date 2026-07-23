import express from "express";
import { submitContact, getAllContacts } from "../controllers/contactController.js";

const contactRoutes = express.Router();

contactRoutes.post("/", submitContact);
contactRoutes.get("/", getAllContacts);

export default contactRoutes;