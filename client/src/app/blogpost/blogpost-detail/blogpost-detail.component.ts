import { Component, OnInit } from "@angular/core";
import { BlogService } from "./../blog.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { blogPost } from "./../blog.model";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-blogpost-detail",
  templateUrl: "./blogpost-detail.component.html",
  styleUrls: ["./blogpost-detail.component.css"]
})
export class BlogpostDetailComponent implements OnInit {
  blog: blogPost;
  blog$: Observable<blogPost>;
  error: {};
  constructor(
    private BlogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.blog$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.BlogService.getBlogDetails(+params.get("id"))
    //   )
    // );
    let id = this.route.snapshot.paramMap.get("id");
    this.BlogService.getBlogDetails(id).subscribe(
      (response: blogPost) => {
        this.blog = response[0];
      },
      err => {
        this.error = err;
        console.log(this.error);
      }
    );
  }
}
