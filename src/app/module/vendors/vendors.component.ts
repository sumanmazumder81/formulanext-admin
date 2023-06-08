import { Component, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'vendors-root',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VendorComponent {
  title = 'Vehicle';
  constructor(
    private router: Router
  ){}
  
}