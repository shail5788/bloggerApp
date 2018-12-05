import { BlogService } from "./../blog.service";
import { blogPost } from "./../blog.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-blogpost-featured",
  templateUrl: "./blogpost-featured.component.html",
  styleUrls: ["./blogpost-featured.component.css"]
})
export class BlogpostFeaturedComponent implements OnInit {
  blogPost: blogPost;
  error: {};
  constructor(private BlogService: BlogService) {}
  ngOnInit() {
    this.BlogService.getFeaturedBlog().subscribe(
      (response: blogPost) => {
        this.blogPost = response;
        //console.log(this.blogPost);
      },
      err => {
        this.error = err;
      }
    );
  }
}
