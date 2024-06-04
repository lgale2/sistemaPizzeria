import { where } from "sequelize";
import Address from "../models/address.js";

class AddressRepository {
  constructor(AddressModel) {
    this.Address = AddressModel;
  }

  findAll() {
    return this.Address.findAll();
  }

  findById(id) {
    return this.Address.findByPk(id);
  }

  create(data) {
    return this.Address.create(data);
  }

  update(id, data) {
    return this.Address.update(data, { where: { Code: id } });
  }

  delete(id) {
    return this.Address.destroy({ where: { Code: id } });
  }
}

export default AddressRepository;
