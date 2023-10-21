import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToggleIsLoading } from '../../animations/toggle-isLoading';

@Component({
  selector: 'app-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.scss'],
  animations: [ToggleIsLoading]
})
export class ButtonLoadingComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() title: string = 'Submit';
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {

  }
  submit(e: any) {
    this.onSubmit.emit(e)
  }
}
