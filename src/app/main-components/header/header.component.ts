import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userAuth from '../../state-management/index'
import * as Auth from "../../state-management/userauth.action";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private store :Store<userAuth.State>
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.store.dispatch(new Auth.Logout())
  }

}
