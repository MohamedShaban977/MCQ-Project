import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../service/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  currentStep: number = 1;



  formGroup!: FormGroup;
  constructor(private fb: FormBuilder, private toster: ToastrService,
    private service: DoctorService) { }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],

      questions: this.fb.array([this.examFields()])
    });
  }

  get questions() {
    return this.formGroup.get('questions') as FormArray
  }
  examFields(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answerOne: ['', Validators.required],
      answerTwo: ['', Validators.required],
      answerThree: ['', Validators.required],
      answerFour: ['', Validators.required],
      correctAnswer: ['', Validators.required]
    });
  }

  addExam() {
    this.questions.push(this.examFields());
  }

  removeExam(index: number) {
    this.questions.removeAt(index);
  }




  displayStep(indexStep: number) {

    this.currentStep = indexStep;
  }

  nextStep() {
    if (this.currentStep == 3) return;

    this.currentStep += 1
  }

  previousStep() {

    if (this.currentStep == 1) return;
    this.currentStep -= 1
  }





  getControl(control: string) {
    return this.formGroup.get(control) as FormControl;
  }

  getExamControl(i: number, control: string) {
    return (this.formGroup.get('questions') as FormArray).controls[i].get(control) as FormControl;
  }



  validSubjectName(): string | null {
    if (this.getControl('name').errors?.['required']) {
      return 'Subject name is required';
    }
    return null
  }

  validQuestion(i: number): string | null {
    if (this.getExamControl(i, 'question')?.errors?.['required']) {
      return 'Question is required';
    }
    return null
  }

  validAnswerOne(i: number): string | null {
    if (this.getExamControl(i, 'answerOne')?.errors?.['required']) {
      return 'Answer One is required';
    }
    return null
  }

  validAnswerTwo(i: number): string | null {
    if (this.getExamControl(i, 'answerTwo')?.errors?.['required']) {
      return 'Answer Two is required';
    }
    return null
  }
  // correctAnswer: ['', Validators.required]
  validAnswerThree(i: number): string | null {
    if (this.getExamControl(i, 'answerThree')?.errors?.['required']) {
      return 'Answer Three is required';
    }
    return null
  }

  validAnswerFour(i: number): string | null {
    if (this.getExamControl(i, 'answerFour')?.errors?.['required']) {
      return 'Answer Four is required';
    }
    return null
  }

  validCorrectAnswer(i: number): string | null {
    if (this.validAnswerFour(i) == null && this.validAnswerThree(i) == null && this.validAnswerTwo(i) == null && this.validAnswerOne(i) == null) {
      if (this.getExamControl(i, 'correctAnswer')?.errors?.['required']) {
        return 'Correct Answer is required';
      }
    }

    return null
  }

  handleCorrectAnswer(correctAnswer: string): string {
    if (correctAnswer == 'One') {
      return 'A';
    }
    else if (correctAnswer == 'Two') {
      return 'B';
    }
    else if (correctAnswer == 'Three') {
      return 'C';
    }

    else if (correctAnswer == 'Four') {
      return 'D';
    }

    else {
      return ''
    }
  }


  submit() {
    console.log(this.formGroup.value);
    const model = {
      name: this.formGroup.value.name,
      questions: this.formGroup.value.questions,
    }

    console.log('model📢📢📢📢', model);

    setTimeout(() => {

      this.service.addNewExam(model).subscribe({
        next: res => {
          this.toster.success('Exam successfully added')
        }
      })
    }, 3000)
  }

}


