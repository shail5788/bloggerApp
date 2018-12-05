import { Injectable } from "@angular/core";
import { blogPost } from "./blog.model";
import { Category } from "./categories/category.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class BlogService {
  serverUrl = "http://localhost:1978/";
  errorData = {};
  constructor(private http: HttpClient) {}

  getBlog() {
    return this.http
      .get<blogPost>(this.serverUrl + "api/blogs")
      .pipe(catchError(this.handleError));
  }
  getRecentBlog() {
    return this.http
      .get<blogPost>(this.serverUrl + "api/recent-blog")
      .pipe(catchError(this.handleError));
  }
  getFeaturedBlog() {
    return this.http
      .get<blogPost>(this.serverUrl + "api/feature-blogs")
      .pipe(catchError(this.handleError));
  }
  getCategory() {
    return this.http
      .get<Category>(this.serverUrl + "api/get-categories")
      .pipe(catchError(this.handleError));
  }
  getBlogDetails(id) {
    return this.http
      .get<blogPost>(this.serverUrl + "api/blog/" + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: "Oops! Request for document failed",
      errorDesc: "Something bad happened. Please try again later."
    };
    return throwError(this.errorData);
  }
}
