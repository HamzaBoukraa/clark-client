import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '@cyber4all/clark-entity';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as md5 from 'md5';
import { Type } from '@angular/compiler/src/core';

type orientation = ("prev" | "next" | "none"); 

@Component({
  selector: 'clark-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'], 
})

export class RegisterComponent implements OnInit {

  loading: boolean = false;
  verified: boolean = false;
  check: boolean = true; 

  regInfo = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    organization: '',
    password: ''
  };
  regForm = new FormGroup({
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    organization: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    verifypassword: new FormControl(null, Validators.required),
    captcha: new FormControl()
  });

  siteKey = '6LfS5kwUAAAAAIN69dqY5eHzFlWsK40jiTV4ULCV';

  passwordVerify = '';
  registerFailure;
  registerFailureTimer;
  redirectRoute;
  redirectUrl;
  size: number = 200; 
  default: string; 
  page: number = 1; 
  orientation: string = null; 

  constructor(private auth: AuthService, private route: ActivatedRoute, private fb: FormBuilder) {

    this.route.parent.data.subscribe(data => {
      if (route.snapshot.queryParams.returnUrl) {
        this.redirectUrl = this.auth.makeRedirectURL(
          route.snapshot.queryParams.returnUrl
        );
      } else {
        if (route.snapshot.queryParams.redirectRoute) {
          this.redirectRoute = route.snapshot.queryParams.redirectRoute;
        } else {
          this.redirectRoute = data.redirect;
        }
      }
    });
  }

  ngOnInit() {}

  submit() {
    this.updateObjValues(); 
    this.registerFailure = undefined;
    clearTimeout(this.registerFailureTimer);
    this.loading = true;

    if (!this.validate()) {
      return false;
    }

    if (this.regInfo.password !== this.passwordVerify) {
      this.error('Passwords do not match!');
      this.loading = false;
      return;
    }

    let u = new User(
      this.regInfo.username,
      `${this.regInfo.firstname.trim()} ${this.regInfo.lastname.trim()}`,
      this.regInfo.email.trim(),
      this.regInfo.organization.trim(),
      this.regInfo.password
    );

    this.auth.register(u).subscribe(
      val => {
        if (this.redirectRoute) {
          window.location.href = window.location.origin + this.redirectRoute;
        } else {
          window.location.href = this.redirectUrl;
        }
      },
      error => {
        this.error(error.error.message);
      }
    );
  }

  validate(): boolean {
    let m: boolean[] = Object.values(this.regInfo).map(function(l) {
      return (l && l !== '' && true) || false;
    });
    let email =
      this.regInfo.email.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
      ) !== null;

    if (m.includes(false) && this.verified === true) {
      this.error('Please fill in all fields!');
      this.loading = false;
      return false;
    } else if (this.verified === false) {
      this.error('Please complete captcha!');
      this.loading = false;
      return false;
    } else if (!email) {
      this.error('Please enter a valid email!');
      this.loading = false;
      return false;
    }

    return true;
  }

  error(text: string = 'An error occured', duration: number = 4000) {
    this.registerFailure = text;
    this.loading = false;
    this.registerFailureTimer = setTimeout(() => {
      this.registerFailure = undefined;
    }, duration);
  }

  captureResponse(event) {
    this.verified = event;
  }

  // navigation 
  next():number{
    //this.orientation = "forward"; 
    //this.pageValidate(this.page); 
    if (this.page == 1 && this.check) {
      this.page = 2; 
      return this.page; 
    } else if (this.page == 2 && this.check) {
      this.page = 3; 
      return this.page;
    }
  }

  // navigation 
  back():number{
    //this.orientation = "backward"; 
    if (this.page == 2) {
      this.page = 1; 
      return this.page; 
    } else if (this.page == 3) {
      this.page = 2; 
      return this.page;
    }
  }

  pageValidate(value : number) { 
    switch(value) { 
      case 1:
        if (this.regForm.controls['firstname'].value !== null && this.regForm.controls['lastname'].value !== null &&
              this.regForm.controls['email'].value !== null && this.regForm.controls['organization'].value !== null) { 
          this.check = true; 
        } else {
          this.error('Please fill in all fields!');
          this.check = false; 
        }
        break; 
      case 2: 
        if (this.regForm.controls['username'].value !== null && this.regForm.controls['password'].value !== null &&
              this.regForm.controls['verifypassword'].value !== null) { 
          this.check = true; 
        } else {
          this.error('Please fill in all fields!');
          this.check = false; 
        }
        break; 
      }
  }

  // Places FormControl values in regInfo object 
  // RegInfo object is used for form validation 
  updateObjValues(){
    this.regInfo.firstname = this.regForm.controls['firstname'].value; 
    this.regInfo.lastname = this.regForm.controls['lastname'].value;
    this.regInfo.email = this.regForm.controls['email'].value;
    this.regInfo.organization = this.regForm.controls['organization'].value;
    this.regInfo.username = this.regForm.controls['username'].value;
    this.regInfo.password = this.regForm.controls['password'].value;
    this.passwordVerify = this.regForm.controls['verifypassword'].value; 
  }
}
