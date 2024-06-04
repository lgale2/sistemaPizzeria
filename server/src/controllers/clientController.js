import clientRepository from "../repositories/clientRepository.js";
class ClientController {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }

  async getClients(req, res) {
    try {
      const clients = await this.clientRepository.findAll();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getClientId(req, res) {
    try {
      const id = req.params.id;
      const clientId = await this.clientRepository.findById(id);
      if (!clientId) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.status(200).json(clientId);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async saveClient(req, res) {
    try {
      const client = {
        Name: req.body.Name,
        Phone: req.body.Phone,
      };
      const clientSaved = await this.clientRepository.create(client);
      res.status(200).json("Client saved");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateClient(req, res) {
    try {
      const id = req.params.id;
      const clientId = await this.clientRepository.findById(id);
      if (!clientId) {
        return res.status(404).json("Client not found");
      }
      const client = {
        Name: req.body.Name,
        Phone: req.body.Phone,
      };
      const clientUpdated = await this.clientRepository.update(id, client);
      res.status(200).json("Client updated!");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteClient(req, res) {
    try {
      const id = req.params.id;
      const clientId = await this.clientRepository.findById(id);
      if (!clientId) {
        return res.status(404).json({ message: "Client not found" });
      }

      await this.clientRepository.delete(id);
      res.status(200).json("Client deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default ClientController;
