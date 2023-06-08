import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

  // constructor(private el: ElementRef) { }
  @Input() appOnlyNumber: boolean;

  // @HostListener('keydown', ['$event']) onKeyDown(event) {
  //   let e = <KeyboardEvent> event;
  //   console.log(e);    
  //   if (this.appOnlyNumber) {
  //     let dotCount = (this.el.nativeElement.value.match(new RegExp(".", "g")) || []).length;
  //     console.log(dotCount);   
  //     if(dotCount === 0){
  //       return
  //     }
  //     if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
  //       // Allow: Ctrl+A
  //       (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
  //       // Allow: Ctrl+C
  //       (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
  //       // Allow: Ctrl+V
  //       (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
  //       // Allow: Ctrl+X
  //       (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
  //       // Allow: home, end, left, right
  //       (e.keyCode >= 35 && e.keyCode <= 39)) {
  //         // let it happen, don't do anything
  //         return;
  //       }
  //       console.log(e.shiftKey , e.keyCode < 48 , e.keyCode > 57 , e.keyCode < 96 , e.keyCode > 105 , dotCount > 0);        
  //       // Ensure that it is a number and stop the keypress
  //       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && ((dotCount > 0) || (e.keyCode < 110))) {
  //         // alert("do not call");
  //           e.preventDefault();
  //       }
  //     }
  // }

  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,4}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    '-',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete',
  ];

  constructor(private el: ElementRef) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // console.log(this.el.nativeElement.value);
    if(this.appOnlyNumber){
      // Allow Backspace, tab, end, and home keys
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      let current: string = this.el.nativeElement.value;
      const position = this.el.nativeElement.selectionStart;
      const next: string = [
        current.slice(0, position),
        event.key == 'Decimal' ? '.' : event.key,
        current.slice(position),
      ].join('');
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
  }
}
