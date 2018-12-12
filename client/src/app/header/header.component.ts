import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { Route } from "@angular/compiler/src/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  get isLoggedIn() {
    //return this.authService.isLoggedIn;
    //console.log(typeof this.authService.getAuthorizationToken());
    if (typeof this.authService.getAuthorizationToken() != "undefined") {
      return true;
    }
    return false;
  }
  userLogout() {
    this.authService.isLoggedIn = false;
    let currentUser = "false";
    localStorage.setItem("currentUser", currentUser);
    this.router.navigate(["/login"]);
  }
}
