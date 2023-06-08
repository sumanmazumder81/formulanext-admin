import { Injectable } from '@angular/core';
import store from "store";
import { UserInterface } from "../interface/user-interface";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: UserInterface;
  public apiToken: string = store.get("apiToken");
  constructor() { }

  setUser(user: UserInterface) {
    // console.log(user);
    // console.log(user.id);
    this.user = user;
    this.apiToken = user.token;
    store.set("apiToken", user.token);
    // this.user_type =  user.user_type;
  }
}
