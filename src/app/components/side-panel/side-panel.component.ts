import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserEntitiesService } from '../../services/user-entities.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidePanelComponent implements OnInit {

  constructor(private userentity: UserEntitiesService, private router: Router) { }
  public menus = [
    {id: 1, name: 'Dashboard', link: 'dashboard', isActive: false, image: '../../../assets/images/home_icon.svg', activeImage: '../../../assets/images/home_icon_active.svg'},
    {id: 2, name: 'Clients', link: 'clients', isActive: false, image: '../../../assets/images/clients_icon.svg', activeImage: '../../../assets/images/clients_icon_active.svg'},
    {id: 3, name: 'Vendors', link: 'vendors', isActive: false, image: '../../../assets/images/vendors.svg', activeImage: '../../../assets/images/vendors_icon_active.svg'},
    {id: 4, name: 'Vehicles', link: 'vehicles', isActive: false, image: '../../../assets/images/vehicles-icon.svg', activeImage: '../../../assets/images/vehicles_icon_active.svg'},
    {id: 5, name: 'Master', link: 'master', isActive: false, image: '../../../assets/images/setting-icon.svg', activeImage: '../../../assets/images/setting_icon_active.svg'},
    {id: 6, name: 'Members', link: 'members', isActive: false, image: '../../../assets/images/members_icon.svg', activeImage: '../../../assets/images/members_icon_active.svg'},
  ];
  ngOnInit(): void {
  }

  routeToEntity(callus: string){
    this.userentity.setCurrentCaller(callus);
    this.router.navigateByUrl('/dashboard/vendor')
  }

}
