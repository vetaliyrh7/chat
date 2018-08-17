export class Offer {

  roomId: string;
  price: number;
  qty: number;
  seller: number;
  buyer: number;
  accept = false;
  reject = false;

  constructor(roomId: string, price: number, qty: number, seller: number, buyer: number) {
    this.roomId = roomId;
    this.price = price;
    this.qty = qty;
    this.seller = seller;
    this.buyer = buyer;
  }
}
