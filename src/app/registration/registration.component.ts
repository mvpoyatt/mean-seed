import { Component, OnInit } from '@angular/core';
import { FormGroup, 
         FormControl, 
         FormBuilder, 
         Validators } from '@angular/forms';
import { User } from './registration.user';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  regForm: FormGroup;
  emailDirty: boolean = false;
  nameDirty: boolean = false;
  passwordDirty: boolean = false;
  confirmPwdDirty: boolean = false;

  constructor(private _rs: RegistrationService,
              private _fb: FormBuilder,
              private _router: Router) { 

    this.regForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, this.emailValidator]],
      passwords: this._fb.group({
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmPwd: ['', [Validators.required, Validators.minLength(7)]]
      }, {validator: this.matchPwdValidator})
    });
  }

  onSubmit() {
    if (this.regForm.dirty && this.regForm.valid) {
      let user = new User(this.regForm.value.name, 
                          this.regForm.value.email,
                          this.regForm.controls.passwords.value.confirmPwd);

      this._rs.sendRequest(user)
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

  matchPwdValidator(formGroup: FormGroup) {
    let valid = (formGroup.controls['password'].value == formGroup.controls['confirmPwd'].value);
    return valid ? null : {matchPwdValidator: {'valid': false}};
  }

}
