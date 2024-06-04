import addressRepository from "../repositories/addressRepository.js";
import clientRepository from "../repositories/clientRepository.js";
class AddressController {
  constructor(addressRepository, clientRepository) {
    this.addressRepository = addressRepository;
    this.clientRepository = clientRepository;
  }

  async getAddres(req, res) {
    try {
      const address = await this.addressRepository.findAll();
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAddressId(req, res) {
    try {
      const id = req.params.id;
      const addressId = await this.addressRepository.findById(id);
      if (!addressId) {
        return res.status(404).json({ message: "Address not found" });
      }
      res.status(200).json(addressId);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async saveAddress(req, res) {
    try {
      const { Address, Client } = req.body;
      const clientId = await this.clientRepository.findById(Client);
      if (!clientId) {
        return res.status(404).json({ error: "Client not found" });
      }
      const address = {
        Address: Address,
        Client: Client,
      };

      const addressSaved = await this.addressRepository.create(address);
      res.status(200).json("Address saved");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async updateAddress(req, res) {
    try {
      const id = req.params.id;
      const { Address, Client } = req.body;
      const clientId = await this.clientRepository.findById(Client);
      const addresId = await this.addressRepository.findById(id);
      if (!clientId) {
        return res.status(404).json({ error: "Client not found" });
      }
      if (!addresId) {
        return res.status(404).json({ error: "Address not found" });
      }
      const data = {
        Address: Address,
        Client: Client,
      };

      const addressUpdated = await this.addressRepository.update(id, data);
      console.log(addressUpdated, "data");
      res.status(200).json("Address updated");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async deleteAddress(req, res) {
    try {
      const id = req.params.id;
      const addressId = await this.addressRepository.findById(id);
      if (!addressId) {
        return res.status(404).json({ message: "Address not found" });
      }
      await this.addressRepository.delete(id);
      res.status(200).json({ message: "Deleted address" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default AddressController;
