import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {ChatWindowComponent} from './components/chat-window/chat-window.component';
import {ChatInputComponent} from './components/chat-input/chat-input.component';
import {UsersComponent} from './components/users/users.component';

import {ChatService} from './services/chat.service';
import {BaseService} from './services/base.service';
import {LoginComponent} from './components/login/login.component';
import {AppRoutingModule} from './routing.module';
import {FeedComponent} from './components/feed/feed.component';
import {AuthService} from './services/auth.service';
import {OfferComponent} from './components/offer/offer.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    ChatInputComponent,
    UsersComponent,
    LoginComponent,
    FeedComponent,
    OfferComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ChatService, BaseService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
