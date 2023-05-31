import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule  } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContentComponent } from './content/content.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    LeftnavComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProfileComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
