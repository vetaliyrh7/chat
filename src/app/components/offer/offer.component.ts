import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../services/base.service';
import {ChatService} from '../../services/chat.service';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  public offerForm: FormGroup;
  public room: any;
  public offerSend: any;
  public offerReceive: any;
  public receivedOffer: any[];
  public receivedOfferCount: number;
  public sendOfferStream;
  public receiveOfferStream;
  constructor(private baseService: BaseService, private chatService: ChatService ) {
    this.offerForm = new FormGroup({
      'price': new FormControl(''),
      'qty': new FormControl('')
    });
    this.room = this.chatService.getRoom();
    this.sendOfferStream = this.chatService.sendOfferModal.subscribe( value => {
      if (value === 'open') {
        this.offerSend = true;
      } else {
        this.offerSend = false;
      }
    });
    this.receiveOfferStream = this.chatService.receiveOfferModal.subscribe( value => {
      if (value === 'open') {
        this.offerReceive = true;
        this.chatService.getOffers();
        this.receivedOffer = this.chatService.receivedOffers;
        this.receivedOfferCount = (this.receivedOffer.length + 1);
      } else {
        this.offerReceive = false;
        this.receivedOffer = [];
      }
    });
  }
  ngOnInit() {
  }

  closeSendOfferModal (): void {
    this.offerSend = false;
    this.sendOfferStream.unsubscribe();
  }

  closeReceiveOfferModal(): void {
    this.offerReceive = false;
    this.receivedOffer = [];
  }

  sendOffer(): void {
    const form = this.offerForm.getRawValue();
    this.chatService.createOffer(form);
  }

  rejectOffer(offer): void {
    offer.reject = true;
    this.baseService.rejectOffer(offer).subscribe((response: any) => {
      this.receivedOffer.splice((response.id - 1), 1);
      console.log(this.receivedOffer);
    });
  }

  acceptOffer(offer): void {
    offer.accept = true;
    this.baseService.acceptOffer(offer).subscribe( (response: any) => {

      this.receivedOffer.splice((response.id - 1), 1);
      console.log(this.receivedOffer);
    });
  }


}
