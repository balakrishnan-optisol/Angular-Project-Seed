import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as userAuth from './state-management/index'
import * as Auth from "./state-management/userauth.action";
import { RootService } from './service/root.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'web';
  loading: boolean = true;
  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  showprogress$: Observable<boolean>;

  constructor(
    private store: Store<userAuth.State>,
    private rs:RootService
  ) {
    this.isLoading$ = this.store.select(userAuth.getIsLoading);
    this.isLoggedIn$ = this.store.select(userAuth.getIsLoggedIn);
    this.showprogress$ = this.store.select(userAuth.getShowProgress);
  }

  ngOnInit() {
    this.rs.showErrorToasty("Hi Toasty Error")
    this.rs.showSuccessToasty("Hi Toasty Success")
    this.store.dispatch(new Auth.Authorized());
  }
}
