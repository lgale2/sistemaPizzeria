export class Address {
  Code?: number;
  Address: string;
  Client: number;

  constructor(Address: string, Client: number) {
    this.Address = Address;
    this.Client = Client;
  }
}
