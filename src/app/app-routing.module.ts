import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './main/main.component';
import { TokenGuard } from './guards/token.guard';
import { AuthorizedComponent } from './authorized/authorized.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'authorized',
    component: AuthorizedComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
