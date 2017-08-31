import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from "./login.user";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  private _user: User;
  constructor( private http: Http) { }

  sendRequest(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post('/auth/login', user)
        .map((res: Response) => res.json())
        .subscribe((user: User) => {
          if (user) {
            this._user = user;
            resolve(user);
          } else {
            reject('Invalid email or password');
          }
        },
        (error) => reject(error)
        );
    });
  }

}
