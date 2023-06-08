import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  constructor(
    private apiService: ApiService, 
    private http: HttpClient,
  ) { }

  brokerAdd(brokerFromData){
    const url = this.apiService.getUrl("Brokers");
    return this.http.post(url, brokerFromData)
  }
  brokerList(page, pageSize, searchString){
    let url = this.apiService.getUrl(`Brokers/search?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}`); // query prqmqter
   
    return this.http.get(url);
  }

  brokerSearchList(page, pageSize, searchString){
    let url = this.apiService.getUrl(`Brokers/search?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}`); // query prqmqter
    return this.http.get(url);
  }
  brokerDelete(id){
    const url = this.apiService.getUrl(`Brokers/${id}`);
    return this.http.delete(url);
  }
  brokerEdit(id, fromData){
    const url = this.apiService.getUrl(`Brokers/${id}`);
    return this.http.put(url, fromData)
  }
  brokerGetData(id){
    const url = this.apiService.getUrl(`Brokers/${id}`);
    return this.http.get(url);
  }
}
