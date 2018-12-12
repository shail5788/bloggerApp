import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { BlogService } from "../services/blog.service";
import { Blog } from "../models/blog";
@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  title = "Dashboard";
  blogs: Blog;
  constructor(
    private authService: AuthService,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    if (!this.authService.getAuthorizationToken()) {
      console.log(this.authService.getAuthorizationToken());
      this.router.navigate(["/login"]);
    }
    this.blogService.getBlog().subscribe((data: Blog) => {
      this.blogs = data;
      console.log(this.blogs);
    });
  }
}
