import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_TEXT:any = {
  required: "Should not be empty!",
  email: "Email is not Valid",
  notMatch: "Password and confirm password does not match",
  minlength: "Field is to short",
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnChanges, OnInit{
  @Input()control!:AbstractControl
  @Input()showErrorsWhen:boolean = true
  errorMessages: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation()
    })
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation()
    })
  }

  checkValidation(){
    const errors = this.control.errors
    if(!errors){
      this.errorMessages = []
      return
    }
    const errorKeys = Object.keys(errors)
    this.errorMessages = errorKeys.map(key => VALIDATORS_TEXT[key])
  }

}
