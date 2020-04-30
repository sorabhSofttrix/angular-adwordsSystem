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
  MatNativeDateModule,
  MatCheckboxModule

} from '@angular/material';


import { MatTreeModule } from '@angular/material/tree';
import { CategoryPipe } from './api-services/api-service/category.pipe';
import { AccSpecificComponent } from './pages/users/acc-specific/acc-specific.component';
import { DatePipe } from '@angular/common';
import { DeleteComponent } from './pages/delete/delete.component';
import { NgxStarsModule } from 'ngx-stars';
import { AddProfileComponent } from './pages/profiles-listing/add-profile/add-profile.component';
import { AddClientComponent } from './pages/client-listing/add-client/add-client.component';
import { AddProjectComponent } from './pages/project-listing/add-project/add-project.component';
import { TwoDigitDecimaNumberDirective } from './api-services/api-service/twodigit-decimal numbber';

import { MatStepperModule } from '@angular/material/stepper';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ResolveComponent,
    AccSpecificComponent,
    DeleteComponent,
    AddProfileComponent,
    AddClientComponent,
    AddProjectComponent,
    TwoDigitDecimaNumberDirective,






  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
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
    MatTreeModule,
    NgxStarsModule,
    MatStepperModule,
    MatCheckboxModule

  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    CategoryPipe, DatePipe,

  ],
  entryComponents: [ResolveComponent, AccSpecificComponent, DeleteComponent, AddProfileComponent,
    AddClientComponent, AddProjectComponent],
  exports: [ResolveComponent, AccSpecificComponent, DeleteComponent, AddProfileComponent,
    AddClientComponent, AddProjectComponent],
  bootstrap: [AppComponent]

})
export class AppModule { }
