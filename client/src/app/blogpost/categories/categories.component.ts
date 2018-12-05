import { Component, OnInit } from "@angular/core";
import { BlogService } from "../blog.service";
import { Category } from "./category.model";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  categories: Category;
  title = "Category";
  error: {};
  constructor(private blogServce: BlogService, private titleService: Title) {}

  ngOnInit() {
    // this.titleService.setTitle(this.title);
    this.blogServce.getCategory().subscribe(
      (response: Category) => {
        this.categories = response;
      },
      error => {
        this.error = error;
      }
    );
  }
}
