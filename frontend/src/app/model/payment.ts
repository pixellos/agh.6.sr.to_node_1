export class Payment {
  cardNumber: string;
  pin: string;
  accepted: boolean = false;
  status: string = 'NIEZAKCEPTOWANO PLATNOSCI';

  constructor() {
  }
}
