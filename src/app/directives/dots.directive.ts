import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDots]'
})
export class DotsDirective {

  constructor(private el: ElementRef) { }
  @Input() appDots: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    
    
    if (this.appDots) {
      let dotCount = (this.el.nativeElement.value.match(new RegExp(".", "g")) || []).length;
      console.log(this.el.nativeElement.value);  
      if (dotCount > 0) {
          // let it happen, don't do anything
          e.preventDefault();
        }
        console.log(e.shiftKey , e.keyCode < 48 , e.keyCode > 57 , e.keyCode < 96 , e.keyCode > 105 , dotCount > 0);        
        // Ensure that it is a number and stop the keypress
        
      }
  }
}
