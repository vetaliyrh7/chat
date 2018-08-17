import {Component, DoCheck, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {BaseService} from '../../services/base.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, DoCheck {
  public person: {id: number, name: string};
  public message: string;
  public messages = [];
  public loggedUser: {name: string, id: number};

  constructor(private chatService: ChatService, private baseService: BaseService) {
    this.loggedUser = this.baseService.getLoggedUser();
  }

  ngOnInit() {
  }

  // Checking for changes in our variables

  ngDoCheck() {
    this.person = this.chatService.getContactToChat();
    this.messages = this.chatService.getMessages();
  }

}
