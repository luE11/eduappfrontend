import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexScreenComponent } from './components/index-screen/index-screen.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggedInLayoutComponent } from './layouts/logged-in-layout/logged-in-layout.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { GlobalHttpErrorInterceptor } from './interceptors/global-http-error.interceptor';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { PaginationComponent } from './components/utils/pagination/pagination.component';
import { UserListFilterComponent } from './components/users/user-list-filter/user-list-filter.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { GenericInputComponent } from './components/utils/generic-input/generic-input.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexScreenComponent,
    BaseLayoutComponent,
    LoginFormComponent,
    LoggedInLayoutComponent,
    HomeScreenComponent,
    UserDetailsComponent,
    UserListComponent,
    PaginationComponent,
    UserListFilterComponent,
    AddUserComponent,
    GenericInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // forms
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
