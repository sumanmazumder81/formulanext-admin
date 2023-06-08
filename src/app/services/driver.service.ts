import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(
    private apiService: ApiService, 
    private http: HttpClient,
  ) { }

  driverAdd(driverFormData){
    const url = this.apiService.getUrl("Drivers");
    return this.http.post(url, driverFormData)
  }
  driverList(){
    const url = this.apiService.getUrl("Drivers");
    return this.http.get(url);
  }

  driverSearchList(page, pageSize, searchString){
    const url = this.apiService.getUrl(`Drivers/search?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}`);
    return this.http.get(url);
  }

  driverDelete(id){
    const url = this.apiService.getUrl(`Drivers/${id}`);
    return this.http.delete(url);
  }
  driverGetData(id){
    const url = this.apiService.getUrl(`Drivers/${id}`);
    return this.http.get(url);
  }
  driverEdit(id, fromData){
    const url = this.apiService.getUrl(`Drivers/${id}`);
    return this.http.put(url, fromData)
  }
  ownerRelatedDriverListSearch(page, pageSize, searchString){
    let url = this.apiService.getUrl(`Drivers/search/availableDrivers?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}`)
    return this.http.get(url);
  }
}
