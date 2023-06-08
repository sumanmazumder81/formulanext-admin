import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleBrandService {

  constructor(
    private apiService: ApiService, 
    private http: HttpClient,
  ) { }

  brandAdd(foramData){
    const url = this.apiService.getUrl("VehicleBrands");
    return this.http.post(url, foramData);
  }
  brandList(){
    const url = this.apiService.getUrl("VehicleBrands");
    return this.http.get(url);
  }

  brandDelete(id){
    const url = this.apiService.getUrl(`VehicleBrands/${id}`);
    return this.http.delete(url)
  }
  brandGetData(id){
    const url = this.apiService.getUrl(`VehicleBrands/${id}`);
    return this.http.get(url)
  }

  brandEdit(id, formData){
    const url = this.apiService.getUrl(`VehicleBrands/${id}`);
    return this.http.put(url, formData)
  }
}
