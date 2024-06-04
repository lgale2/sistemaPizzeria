
//import sequelize from "../config/db";
import Address from "../models/address.js"
import AddressRepository from "../repositories/addressRepository.js"
import AddressController from "../controllers/addressController.js"
import Client from "../models/client.js"
import ClientRepository from "../repositories/clientRepository.js"
import ClientController from "../controllers/clientController.js"
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validaterMiddleware.js";
import { createSchema } from "../schemas/validationAddress.js";
const clientRepository = new ClientRepository(Client)
const clientController = new ClientController(clientRepository)
const addressRepository = new AddressRepository(Address)
const addressController = new AddressController(addressRepository, clientRepository)


const router = Router();

router.get('/address', authRequired, (req, res) => addressController.getAddres(req, res))
router.get('/address/:id', authRequired, (req, res) => addressController.getAddressId(req, res))
router.post('/address', validateSchema(createSchema), authRequired, (req, res) => addressController.saveAddress(req, res))
router.put('/address/:id', authRequired, (req, res) => addressController.updateAddress(req, res))
router.delete('/address/:id', authRequired, (req, res) => addressController.deleteAddress(req, res))
export default router;