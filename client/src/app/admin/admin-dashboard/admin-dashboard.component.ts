import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.getAuthorizationToken()) {
      console.log(this.authService.getAuthorizationToken());
      this.router.navigate(["/login"]);
    } else {
      console.log(this.authService.getAuthorizationToken());
    }
  }
}
