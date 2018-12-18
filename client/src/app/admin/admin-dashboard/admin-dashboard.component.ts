import { ModalService } from "./../../shared/service/modal.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { BlogService } from "../services/blog.service";
import { Blog } from "../models/blog";
//import "../../shared/modal-css/modal.less";
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
    private blogService: BlogService,
    private modalService: ModalService
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
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
