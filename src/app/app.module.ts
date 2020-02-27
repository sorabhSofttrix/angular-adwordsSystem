import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './api-services/interceptor/httpconfig.interceptor';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AccountAlertComponent } from './pages/account-alert/account-alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResolveComponent } from './pages/resolve/resolve.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatIconModule,
  MatButtonToggleGroup,
  MatButtonToggle,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule

} from '@angular/material';


import { MatTreeModule } from '@angular/material/tree';
import { CategoryPipe } from './api-services/api-service/category.pipe';
import { AccSpecificComponent } from './pages/users/acc-specific/acc-specific.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ResolveComponent,
    AccSpecificComponent




  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: false
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    NgxUiLoaderModule,
    NgbModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTreeModule

  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    CategoryPipe,DatePipe
  ],
  entryComponents: [ResolveComponent, AccSpecificComponent],
  exports: [ResolveComponent, AccSpecificComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
