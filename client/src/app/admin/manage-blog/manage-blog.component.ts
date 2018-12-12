import { Component, OnInit } from "@angular/core";
import { BlogService } from "../services/blog.service";
import { Blog } from "../models/blog";
import { fromEventPattern } from "rxjs";
@Component({
  selector: "app-manage-blog",
  templateUrl: "./manage-blog.component.html",
  styleUrls: ["./manage-blog.component.css"]
})
export class ManageBlogComponent implements OnInit {
  blogs: Blog;
  title = "Manage Blogs";
  constructor(private blogService: BlogService) {}
  ngOnInit() {
    this.blogService.getBlog().subscribe((data: Blog) => {
      this.blogs = data;
      console.log(this.blogs);
    });
  }
}
