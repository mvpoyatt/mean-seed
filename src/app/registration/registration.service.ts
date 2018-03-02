import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from './registration.user';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService {

  private _user: User;
  constructor( private http: Http) { }

  sendRequest(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.post('auth/register', user)
        .map((res: Response) => res.json())
        .subscribe(
          (res) => {
            console.log(res);
            if (res.message === 'success' && res.user) {
              //this._user = res.user;
              resolve(res.user);
            } else {
              reject(res.message);
            }
          },
          (error) => {
            console.log(error)
            if (error.error && error.error.message) {
              reject(error.error.message);
            }
            else {
              reject(error.toString());
            }
          }
        )
    })
  }

}
