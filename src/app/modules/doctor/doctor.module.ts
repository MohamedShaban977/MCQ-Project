import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewExamComponent } from './components/new-exam/new-exam.component';



@NgModule({
  declarations: [
    NewExamComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DoctorRoutingModule,
  ]
})
export class DoctorModule { }
