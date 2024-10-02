import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
@Input() label:string='';
@Input() type:string='text';
@Output() valueChange = new EventEmitter<string>();

control:FormControl= new FormControl('', Validators.required);

get value():string{
  return this.control.value;
}
set value(val:string){
  this.control.setValue(val);
  this.valueChange.emit(val);
}
}
