import { Component, OnInit } from "@angular/core";
import { BlogService } from "../blog.service";
import { blogPost } from "../blog.model";
@Component({
  selector: "app-blogpost-recent",
  templateUrl: "./blogpost-recent.component.html",
  styleUrls: ["./blogpost-recent.component.css"]
})
export class BlogpostRecentComponent implements OnInit {
  constructor(private blogService: BlogService) {}
  recentBlog: blogPost;
  error = {};
  ngOnInit() {
    this.blogService.getRecentBlog().subscribe(
      (response: blogPost) => {
        this.recentBlog = response;
      },
      error => {
        this.error = error;
      }
    );
  }
}
