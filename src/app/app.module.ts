import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { NewpassComponent } from './newpass/newpass.component';
import { AboutComponent } from './about/about.component';
import { ContatcComponent } from './contatc/contatc.component';
import { HomeComponent } from './home/home.component';
import { SavedEmailsComponent } from './saved-emails/saved-emails.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmComponent } from './confirm/confirm.component';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DetailsComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    NewpassComponent,
    AboutComponent,
    ContatcComponent,
    HomeComponent,
    SavedEmailsComponent,
    NotFoundComponent,
    DashboardComponent,
    ConfirmComponent,



  ],
  imports: [

BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SearchPipeModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
