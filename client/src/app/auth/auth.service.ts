import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { IUser } from "./login/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  error: {};
  isLoggedIn = false;
  serverUrl = "http://localhost:1978/";
  redirectUrl: string;
  constructor(private http: HttpClient) {}
  login(username: string, password: string) {
    return this.http
      .post<IUser>(this.serverUrl + "api/login", {
        username: username,
        password: password
      })
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.isLoggedIn = true;
          } else {
            this.error = user;
          }
        }),
        catchError(this.handleError)
      );
  }
  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser.token;
  }
  logout() {
    this.isLoggedIn = false;
    const currentUser = "";
    localStorage.setItem("currentUser", currentUser);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    this.error = {
      errorTitle: "Oops! Request for document failed",
      errorDesc: "Something bad happened. Please try again later."
    };
    return throwError(this.error);
  }
}
