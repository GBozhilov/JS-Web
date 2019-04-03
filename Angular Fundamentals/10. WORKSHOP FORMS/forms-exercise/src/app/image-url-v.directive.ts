import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgForm} from '@angular/forms';

@Directive({
  selector: '[appImageUrlV]'
})
export class ImageUrlVDirective {

  constructor(private elementRef: ElementRef, private form: NgForm) {}

  @HostListener('input')
  inputHandle() {
    const elementVal: string = this.elementRef.nativeElement.value;

    if (elementVal.startsWith('http') && (elementVal.endsWith('.png') || elementVal.endsWith('.jpg'))) {
      this.elementRef.nativeElement.style.borderColor = 'green';
      this.form.control.setErrors(null);
    } else {
      this.elementRef.nativeElement.style.borderColor = 'red';
      this.form.control.setErrors({image: true});
    }
  }
}
