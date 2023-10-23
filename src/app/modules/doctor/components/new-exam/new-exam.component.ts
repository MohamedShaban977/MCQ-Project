import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  currentStep: number = 1;
  constructor() { }
  ngOnInit(): void {



  }

  displayStep(indexStep: number) {

    this.currentStep = indexStep;
  }

}
