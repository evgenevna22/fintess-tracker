import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/components/header/header.component';
import { MenuComponent } from './navigation/components/menu/menu.component';
import { TrainingModule } from './training/training.module';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    WelcomeComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    TrainingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
