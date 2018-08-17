
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {FeedComponent} from './components/feed/feed.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule  { }
