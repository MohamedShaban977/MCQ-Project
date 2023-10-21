import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonLoadingComponent } from './components/button-loading/button-loading.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ButtonLoadingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    RouterModule,




  ],
  exports: [
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,

    RouterModule,


    NavbarComponent,
    ButtonLoadingComponent,

  ]
})
export class SharedModule { }
