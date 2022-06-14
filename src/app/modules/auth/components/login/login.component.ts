import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userAuth from '../../../../state-management/index'
import * as Auth from "../../../../state-management/userauth.action";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<userAuth.State>
  ) {
    this.loginForm = this.formBuilder.group(this.buildForm())
    router.events
      .subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          // Perform actions
          console.log("pop state");
          this.store.dispatch(new Auth.Authorized());
        }
      });
  }

  ngOnInit(): void {
  }

  loginUser() {

    this.submitted = true;
    if (this.loginForm.valid) {
      const loginData = Object.assign({}, this.loginForm.value);
      this.store.dispatch(new Auth.Login(loginData));
    }
  }

  buildForm() {
    return {
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    }
  }

  get form() {
    return this.loginForm.controls;
  }
}
