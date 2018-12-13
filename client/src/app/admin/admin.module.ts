import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminComponent } from "./admin/admin.component";
import { ManageBlogComponent } from "./manage-blog/manage-blog.component";
import { ManageCategoriesComponent } from "./manage-categories/manage-categories.component";
import { ManagePagesComponent } from "./manage-pages/manage-pages.component";
import { ModalComponent } from "../shared/modal";
import { ModalService } from "../shared/service";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    ManageBlogComponent,
    ManageCategoriesComponent,
    ManagePagesComponent,
    ModalComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
  providers: [ModalService]
})
export class AdminModule {}
