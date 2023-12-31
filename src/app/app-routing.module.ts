import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { SingupComponent } from './singup/singup.component';
import { LoginComponent } from './login/login.component';
import { UserItemComponent } from './core/user-item/user-item.component';
import { PetItemComponent } from './pet-item/pet-item.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent },
  {path: 'login', component: LoginComponent },
  {path: 'singup', component: SingupComponent },
  {path: 'user', component: UserItemComponent },
  {path: 'user/:id', component: UserItemComponent },
  {path: 'pets', component: PetItemComponent },
  {path: 'pets/:id', component: PetItemComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
