import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.scss']
})
export class GenericInputComponent {

  @Input() type: string = 'text';
  @Input() classes: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() ngClass: string = '';
  @Input() label: string = '';
  @Input() formGroup!: FormGroup;

  isFieldInvalid(){
    return this.formGroup.get(this.name)?.invalid
      && (this.formGroup.get(this.name)?.dirty || this.formGroup.get(this.name)?.touched);
  }

}
