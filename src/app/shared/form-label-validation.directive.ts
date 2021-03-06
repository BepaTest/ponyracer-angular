import { AfterContentInit, ContentChild, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormLabelDirective } from './form-label.directive';

@Directive({
  selector: '[prFormLabelValidation]'
})
export class FormLabelValidationDirective implements AfterContentInit {
  @ContentChild(NgControl) ngControl!: NgControl;
  @ContentChild(FormLabelDirective) label!: FormLabelDirective;

  constructor() {}

  setLabelValidity() {
    this.label.isInvalid = this.ngControl.dirty && this.ngControl.invalid;
  }

  ngAfterContentInit() {
    if (this.ngControl && this.label) {
      this.setLabelValidity();
      this.ngControl.statusChanges?.subscribe(() => this.setLabelValidity());
    }
  }
}
