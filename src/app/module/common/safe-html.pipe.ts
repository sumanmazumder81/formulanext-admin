import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '../../../../node_modules/@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  
  constructor(private sanitizer:DomSanitizer){}
  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    //return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }

}
