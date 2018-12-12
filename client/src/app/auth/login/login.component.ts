import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { IUser } from "./user.model";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  redirectUrl: string;
  error: {};
  loginError: string;
  user: IUser;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    // console.log(localStorage.getItem("currentUser"));
  }
  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }

  onSubmit() {
    this.authService.login(this.username.value, this.password.value).subscribe(
      res => {
        if (this.authService.isLoggedIn) {
          const redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : "/admin";
          this.router.navigate([redirect]);
        } else {
          this.error = this.authService.error;
          this.loginError = "Username or Password wrong!";
        }
      },
      error => {
        this.error = error;
      }
    );
    console.log(this.username.value + "--" + this.password.value);
  }
}
