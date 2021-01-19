import { Calculator } from "../types/Calculator";

export class Resta implements Calculator {
  private readonly number1: number;
  private readonly number2: number;

  constructor(number1: number, number2: number) {
      this.number1 = number1;
      this.number2 = number2
  }

  public async resultado(): Promise<number> {
      return this.number1 - this.number2;
  }
}