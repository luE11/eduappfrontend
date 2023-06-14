import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexScreenComponent } from './components/index-screen/index-screen.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { authGuard } from './guards/auth.guard';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { roleGuard } from './guards/role.guard';
import { AddUserComponent } from './components/users/add-user/add-user.component';

const routes: Routes = [
  { path: 'index', component: IndexScreenComponent, title: 'Eduapp | Index' },
  { path: 'login', component: LoginFormComponent, title: 'Eduapp | Login' },
  { path: '', component: HomeScreenComponent, pathMatch: 'prefix', canActivate: [authGuard], title: 'Eduapp | Home' },
  { path: 'user', canActivate: [authGuard], children: [
    { path: 'details', component: UserDetailsComponent, title: 'Eduapp | User details' },
    { path: 'list', component: UserListComponent, canActivate: [ roleGuard(['Admin', 'Teacher']) ], title: 'Eduapp | Users' },
    { path: 'add', component: AddUserComponent, canActivate: [ roleGuard(['Admin']) ], title: 'Eduapp | Add user' }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
