import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiclesTypeService {

  constructor(
    private apiService: ApiService, 
    private http: HttpClient,
  ) { }

  

    addVehiclesType(vehiclesTypeFormData){
      const url = this.apiService.getUrl("VehicleTypes");
      return this.http.post(url, vehiclesTypeFormData)
    }
    VehiclesTypeList(){
      const url = this.apiService.getUrl("VehicleTypes");
      return this.http.get(url)
    }
    VehiclesTypeBrandList(){
      const url = this.apiService.getUrl("VehicleTypes/getVehicleTypes");
      return this.http.get(url)
    }
    vehiclesTypeEdit(id, formData){
      const url = this.apiService.getUrl(`VehicleTypes/${id}`);
      return this.http.put(url, formData)
    }
    vehiclesTypeDelete(id){
      const url = this.apiService.getUrl(`VehicleTypes/${id}`);
      return this.http.delete(url)
    }
    vehiclesTypeGetData(id){
      const url = this.apiService.getUrl(`VehicleTypes/${id}`);
      return this.http.get(url);
    }
}
