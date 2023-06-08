import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitsService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  measurementUnitsAdd(formData){
    const url = this.apiService.getUrl("MeasurementUnits");
    return this.http.post(url, formData)
  }
  measurementUnitsList(){
    const url = this.apiService.getUrl("MeasurementUnits");
    return this.http.get(url)
  }
  measurementUnitsdelete(id){
    const url = this.apiService.getUrl(`MeasurementUnits/${id}`);
    return this.http.delete(url)
  }

  measurementUnitsEdit(id, formData){
    const url = this.apiService.getUrl(`MeasurementUnits/${id}`);
    return this.http.put(url, formData)
  }
  measureMentGetData(id){
    const url = this.apiService.getUrl(`MeasurementUnits/${id}`);
    return this.http.get(url);
  }
}
