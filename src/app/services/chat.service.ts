import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../components/models/message.model';
import {BaseService} from './base.service';
import 'rxjs/add/observable/forkJoin';
import {Subject} from 'rxjs/Subject';
import {Offer} from '../components/models/offer.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatService {

  public chatWith: any;
  public chatMessages = [];
  private chatMessage: Message;
  public currentContactId: number;
  public room = {
    id: null,
    users: []
  };
  public newOffer: Offer;
  public receivedOffers = [];
  public sendOfferModal: Subject<any> = new Subject<any>();
  public receiveOfferModal: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private baseService: BaseService) {
  }

  // We start our chat, so we get our user by id on what user we click in the left menu. And update our chat messages

  beginToChat(contact) {
    if (contact.id !== this.currentContactId) {
      this.chatMessages = [];
    }
    this.currentContactId = contact.id;

    this.baseService.getUser(contact.id).subscribe((res: object) => {
      this.chatWith = res;
      this.baseService.getRooms()
        .subscribe((rooms: Array<any>) => {
          this.room = rooms.find(room => room.users.indexOf(this.baseService.getLoggedUser().id) !== -1 && room.users.indexOf(this.chatWith.id) !== -1);
          if (!this.room) {
            this.room = {
              id: '_' + Math.random().toString(36).substr(2, 9),
              users: [this.baseService.getLoggedUser().id, this.chatWith.id]
            };
            return this.baseService.createRoom(this.room)
              .subscribe((room: { id: string, users: Array<number> }) => {
                return this.setMessages(room.id);
              });
          }
          setInterval(() => {
            this.setMessages(this.room.id);
          }, 1000);
        });
    });
  }

  // We get messages from existing room
  setMessages(roomId): void {
    this.baseService.getRoomById(roomId)
      .subscribe((room: any) => {
        this.chatMessages = room.messages;
      });
  }

  // Sending message

  sendMessage(msg: string): void {
    const timestamp = new Date();
    this.chatMessage = new Message(this.baseService.getLoggedUser().id, this.room.id, msg, timestamp);
    this.baseService.pushMessage(this.chatMessage).subscribe((res: any) => {
      res.timeSent = this.conventStringToDate(res.timeSent);
      this.chatMessages.push(res);
    });
  }

  // Create new offer

  createOffer(form): void {
    this.newOffer = new Offer(this.room.id, form.price, form.qty, this.baseService.getLoggedUser().id, this.chatWith.id);
    this.baseService.createOffer(this.newOffer).subscribe();
  }

  // Get all offers from the server

  getOffers(): void {
    this.receivedOffers = [];
    this.baseService.getOffers().subscribe((results: Array<any>) => {
      results.filter(offer => {
        if (offer.seller === this.chatWith.id && offer.buyer === this.baseService.getLoggedUser().id && (!offer.accept && !offer.reject)) {
          this.receivedOffers.push(offer);
        }
      });
    });
  }

  // We take our date and change type from string to Date

  conventStringToDate(date): Date {
    return new Date(date);
  }

  // Get our messages

  getMessages(): Array<any> {
    return this.chatMessages;
  }

  // Returning our chatWith object which is person that we are talking to

  getContactToChat(): { id: number; name: string; surname: string; messages: any[]; } {
    return this.chatWith;
  }

  // Returning our room object which includes all information

  getRoom(): object {
    return this.room;
  }

}
