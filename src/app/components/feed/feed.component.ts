import {Component, OnInit} from '@angular/core';
import {BaseService} from '../../services/base.service';
import {ChatService} from '../../services/chat.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public loading = true;
  public offerModal = false;

  // This made for our modal window and OfferComponent

  constructor(private baseService: BaseService, private chatService: ChatService ) {
    this.chatService.sendOfferModal.subscribe( value => {
      if (value === 'open') {
        this.offerModal = true;
      } else {
        this.offerModal = false;
      }
    });
    this.chatService.receiveOfferModal.subscribe( value => {
      if (value === 'open') {
        this.offerModal = true;
      } else {
        this.offerModal = false;
      }
    });
  }

  // Loader

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

}
