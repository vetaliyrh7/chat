import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class BaseService {
  private baseUrl = 'http://localhost:3000/';
  private users = this.baseUrl + 'users/';
  private messages = this.baseUrl + 'messages/';
  private rooms = this.baseUrl + 'rooms/';
  private offers = this.baseUrl + 'offers/';
  public loggedUser: any;

  constructor(private http: HttpClient) {
  }

  // Get users list from db

  getUsers(): Observable<object> {
    return this.http.get(this.users);
  }

  // Get rooms by id

  getRoomById(id): Observable<object> {
    return this.http.get(`${this.rooms}${id}?_embed=messages`);
  }

  // Pushing messages to db

  pushMessage(msg): Observable<object> {
    return this.http.post(this.messages, msg);
  }

  // Create new room in out rooms list

  createRoom(room): Observable<object> {
    return this.http.post(this.rooms, room);
  }

  // Get user by id from db

  getUser(id): Observable<object> {
    return this.http.get(this.users + id);
  }

  // Get all rooms from db

  getRooms(): Observable<Object> {
    return this.http.get(this.rooms);
  }

  // Get our logged user and set it to our variable

  setLoggedUser(user): void {
    this.loggedUser = user;
  }

  // Create offer in db

  createOffer(item): Observable<object> {
    return this.http.post(this.offers, item);
  }

  // Get offers from db

  getOffers(): Observable<object> {
    return this.http.get(this.offers);
  }

  // Change status of existing offer in offers list

  acceptOffer(offer): Observable<object> {
    return this.http.put(this.offers + offer.id, offer);
  }

  // Change status of existing offer in offers list

  rejectOffer(offer): Observable<object> {
    return this.http.put(this.offers + offer.id, offer);
  }

  // Get users list

  login(): Observable<object> {
    return this.http.get(this.users);
  }

  getLoggedUser(): {id: number, name: string} {
    return JSON.parse(localStorage.getItem('user'));
  }

}
