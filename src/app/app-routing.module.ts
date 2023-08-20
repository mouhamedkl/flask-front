import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { CardComponent } from './card/card.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { NewpassComponent } from './newpass/newpass.component';
import { AboutComponent } from './about/about.component';
import { ContatcComponent } from './contatc/contatc.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { SavedEmailsComponent } from './saved-emails/saved-emails.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'offre',component:CardComponent,canActivate:[AuthGuard]},
  {path:'details/:id',component:DetailsComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forget',component:ForgetComponent},
  {path:'newpassword/:token',component:NewpassComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContatcComponent},
  {path:'save',component:SavedEmailsComponent,canActivate:[AuthGuard]},
  {path:'admin',component:DashboardComponent},
  {path:'confirm/:email',component:ConfirmComponent},
  {path:'404',component:NotFoundComponent},
  {path:'**',redirectTo:'/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
