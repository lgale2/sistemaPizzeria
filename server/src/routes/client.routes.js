
//import sequelize from "../config/db";
import Client from "../models/client.js"
import ClientRepository from "../repositories/clientRepository.js"
import ClientController from "../controllers/clientController.js"
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validaterMiddleware.js";
import { createSchema } from "../schemas/validationClient.js";

const clientRepository = new ClientRepository(Client)
const clientController = new ClientController(clientRepository)
const router = Router();

router.get('/client', authRequired, (req, res) => clientController.getClients(req, res))
router.get('/client/:id', authRequired, (req, res) => clientController.getClientId(req, res))
router.post('/client', validateSchema(createSchema), authRequired, (req, res) => clientController.saveClient(req, res))
router.put('/client/:id', authRequired, (req, res) => clientController.updateClient(req, res))
router.delete('/client/:id', authRequired, (req, res) => clientController.deleteClient(req, res))
export default router;