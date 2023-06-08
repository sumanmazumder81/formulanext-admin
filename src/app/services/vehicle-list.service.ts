import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleListService {

  constructor(
    private apiService: ApiService, 
    private http: HttpClient
  ) { }

  addVehicles(vehiclesTypeFormData){
    const url = this.apiService.getUrl("Vehicles");
    return this.http.post(url, vehiclesTypeFormData)
  }
  
  vehicleList(){
    const url = this.apiService.getUrl("Vehicles");
    return this.http.get(url);
  }
  vehiclesSearchList(page, pageSize, searchString){
    let url = this.apiService.getUrl(`Vehicles/search?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}`); // query prqmqter
    return this.http.get(url);
  }
  vehiclesGet(id){
    const url = this.apiService.getUrl(`Vehicles/${id}`); // parameter
    return this.http.get(url);
  }
  vehiclesDelete(id){
    const url = this.apiService.getUrl(`Vehicles/${id}`);
    return this.http.delete(url)
  }
  vehiclesEdit(id, fromData){
    const url = this.apiService.getUrl(`Vehicles/${id}`);
    return this.http.put(url, fromData)
  }
  ownerRelatedVehiclesListSearch(page, pageSize, searchString){
    let url = this.apiService.getUrl(`Vehicles/search/availableVehicles?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}`); // query prqmqter
    return this.http.get(url);
  }
}
