export class Message {
  senderId: number;
  roomId: string;
  message: string;
  timeSent?: Date;

  constructor(senderId: number, roomId: string, message: string, timeSent: Date) {
    this.roomId = roomId;
    this.senderId = senderId;
    this.message = message;
    this.timeSent = timeSent;
}

}
