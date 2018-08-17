import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private baseUrl = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {}


  // Get users list

  login(): Observable<object> {
    return this.http.get(this.baseUrl);
  }

}
