import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OwnerListService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  ownerList(page, pageSize, searchString){
    let url = this.apiService.getUrl(`Owners/search?displayCount=${pageSize}&pageNo=${page}&searchValue=${searchString}`); // query prameter
    // if(searchString){
    //   url = url + ``
    // }
    return this.http.get(url);
  }
  ownerDelete(id){
    const url = this.apiService.getUrl(`Owners/${id}`); // parameter
    return this.http.delete(url);
  }
  ownerGetData(id){
    const url = this.apiService.getUrl(`Owners/${id}`);
    return this.http.get(url);
  }
  ownerGetSearchRelatedEntities(id){
    const url = this.apiService.getUrl(`Owners/${id}/searchRelatedEntitys`);
    return this.http.get(url);
  }
  ownerEdit(id, fromData){
    const url = this.apiService.getUrl(`Owners/${id}`);
    return this.http.put(url, fromData)
  }
  updateRelatedEntitiys(data, id, type){
    const url = this.apiService.getUrl(`Owners/${id}/updateRelatedEntitys/${type}`);
    return this.http.post(url, data);
  }
  searchApiCallForOwnerData(id, type, pageSize, pageIndex, searchValue){
    const url = this.apiService.getUrl(`Owners/${id}/searchRelatedEntitys/${type}?displayCount=${pageSize}&pageNo=${pageIndex}&searchValue=${searchValue}`);
    return this.http.get(url);
  }
  
}
