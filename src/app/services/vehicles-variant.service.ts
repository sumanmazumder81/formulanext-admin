import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VehiclesVariantService {

  constructor(
    private apiService: ApiService, 
    private http: HttpClient
  ) { }

  vehiclesVariantAdd(formData){
    const url = this.apiService.getUrl("VehicleVariants");
    return this.http.post(url, formData);
  }
  vehiclesVariantList(){
    const url = this.apiService.getUrl("VehicleVariants");
    return this.http.get(url);
  }
  vehiclesVariantDelete(id){
    const url = this.apiService.getUrl(`VehicleVariants/${id}`);
    return this.http.delete(url)
  }
  vehiclesVariantGetData(id){
    const url = this.apiService.getUrl(`VehicleVariants/${id}`);
    return this.http.get(url)
  }
  vehiclesVariantEdit(id, formData){
    const url = this.apiService.getUrl(`VehicleVariants/${id}`);
    return this.http.put(url, formData)
  }
}
