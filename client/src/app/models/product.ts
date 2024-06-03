export class Product {
  Code?: number;
  Name: string;
  Price: number;
  Unit: number;
  Tax: number;

  constructor(Name: string, Price: number, Unit: number, Tax: number) {
    this.Name = Name;
    this.Price = Price;
    this.Unit = Unit;
    this.Tax = Tax;
  }
}
