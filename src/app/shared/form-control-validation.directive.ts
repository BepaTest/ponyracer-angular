import { Directive, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  /* eslint-disable @angular-eslint/directive-selector */
  selector: '.form-control'
})
export class FormControlValidationDirective {
  constructor(private ngControl: NgControl) {}

  @HostBinding('class.is-invalid') get isInvalid(): boolean | null {
    return this.ngControl && this.ngControl.dirty && this.ngControl.invalid;
  }
}
