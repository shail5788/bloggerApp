import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ManageBlogComponent } from "./manage-blog/manage-blog.component";
import { ManageCategoriesComponent } from "./manage-categories/manage-categories.component";
import { ManagePagesComponent } from "./manage-pages/manage-pages.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        canActivate: [AuthGuard],
        children: [
          {
            path: "blogs",
            component: ManageBlogComponent,
            canActivate: [AuthGuard]
          },
          {
            path: "categories",
            component: ManageCategoriesComponent,
            canActivate: [AuthGuard]
          },
          {
            path: "pages",
            component: ManagePagesComponent,
            canActivate: [AuthGuard]
          },
          {
            path: "",
            component: AdminDashboardComponent,
            canActivate: [AuthGuard]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
