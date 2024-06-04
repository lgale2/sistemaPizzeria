import { where } from "sequelize";

class ClientRepository {
  constructor(Client) {
    this.Client = Client;
  }

  findAll() {
    return this.Client.findAll();
  }

  findById(id) {
    return this.Client.findByPk(id);
  }

  create(data) {
    return this.Client.create(data);
  }

  update(id, data) {
    return this.Client.update(data, { where: { Code: id } });
  }

  delete(id) {
    return this.Client.destroy({ where: { Code: id } });
  }
}

export default ClientRepository;
