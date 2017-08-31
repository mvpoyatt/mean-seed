import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { User } from './login.user';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  emailDirty: boolean = false;
  passwordDirty: boolean = false;
  error: String = '';

  constructor(private _ls: LoginService,
              private _fb: FormBuilder,
              private _router: Router) { 

    this.loginForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      let email: String = this.loginForm.value.email;
      let password: String = this.loginForm.value.password;
      let user = new User(email, password);

      this._ls.sendRequest(user)
        .then(user => {
          this._router.navigate(['/home']);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }
  }

  emailValidator(formControl: FormControl) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(formControl.value) ? null : {emailValidator: {'valid': false}};
  }

}
