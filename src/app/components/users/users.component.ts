import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../services/base.service';
import {ChatService} from '../../services/chat.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public user = {
    id: 0,
    name: 'Guest',
    surname: 'Guest'
};
  public contacts = [];
  public currentContactId: string;

  // Filter our users list from db, because we dont need to show user that we are logged in

  constructor(private baseService: BaseService, private chatService: ChatService, private router: Router ) {
    this.baseService.getUsers().subscribe( (res: Array<any>) => {
      res.filter( items => {
        if (items.name !== this.user.name) {
          this.contacts.push(items);
        }
      });
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  // We begin our chat and create room in our service

  startChat(contact): void {
    this.chatService.beginToChat(contact);
    this.currentContactId = contact.id;
  }

  // Open our send modal, to send offer

  sendOffer(): void {
    this.chatService.sendOfferModal.next('open');
  }

  // Open our receive modal, to receive modal

  receiveOffer(): void {
    this.chatService.receiveOfferModal.next('open');
  }

  // Logout

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
