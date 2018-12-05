import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { BlogpostModule } from "./blogpost/blogpost.module";
import { CmspageModule } from "./cmspage/cmspage.module";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { BannerComponent } from "./banner/banner.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { httpInterceptorProviders } from "./http-interceptors/index";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BlogpostModule,
    CmspageModule,
    AuthModule,
    AdminModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [Title, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
