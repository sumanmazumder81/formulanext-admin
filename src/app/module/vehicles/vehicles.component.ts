import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'Vehicles-app',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehiclesComponent {
  title = 'Vehicle';
  

  

  // selectChange = (event: any) => {
  //   const key: string = event.key;
  //   this.cardValue[key] = [ ...event.data ];

  //   console.log(this.cardValue);
  // };
}