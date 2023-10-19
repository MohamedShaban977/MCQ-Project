import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,


  ],
  exports: [
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,

    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,

    NavbarComponent
  ]
})
export class SharedModule { }
