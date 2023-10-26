import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  currentStep: number = 1;



  formGroup!: FormGroup;
  examFG!: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nameSubject: ['', [Validators.required]],

      examList: this.fb.array([''])
    });

  }

  get examList() {
    return this.formGroup.get('examList') as FormArray
  }

  addExam() {
    this.examFG = this.fb.group({
      answerOne: ['', Validators.required],
      answerTwo: ['', Validators.required],
      answerThree: ['', Validators.required],
      answerFour: ['', Validators.required],
      correctAnswer: ['', Validators.required]
    });
    this.examList.push(this.examFG);
  }




  displayStep(indexStep: number) {

    this.currentStep = indexStep;
  }

}
