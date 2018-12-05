import { Component, OnInit } from "@angular/core";
import { BlogService } from "../blog.service";
import { blogPost } from "../blog.model";
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-blogpost-list",
  templateUrl: "./blogpost-list.component.html",
  styleUrls: ["./blogpost-list.component.css"]
})
export class BlogpostListComponent implements OnInit {
  title = "Blogs";
  blogPost: blogPost;
  error: {};
  constructor(private blogService: BlogService, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.blogService.getBlog().subscribe(
      (response: blogPost) => {
        console.log(response);
        this.blogPost = response;
      },
      error => (this.error = error)
    );
  }
}
