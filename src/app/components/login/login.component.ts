import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {BaseService} from '../../services/base.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public name: string;
  public loggedUser: any;

  constructor(private baseService: BaseService, private router: Router) {
  }
  ngOnInit() {
  }

  // We get users list from db and make simple check by name

  login(): void {
    this.baseService.login().subscribe( (res: any) => {
      res.filter( user => {
        if ( user.name === this.name) {
          this.loggedUser = user;
          this.baseService.setLoggedUser(this.loggedUser);
          localStorage.setItem('user', JSON.stringify(this.loggedUser));
          this.router.navigate(['/feed']);
        }
      });
    });
  }


}
