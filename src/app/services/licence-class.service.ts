import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LicenceClassService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  licenceClassAdd(formData){
    const url = this.apiService.getUrl("LicenceClasses");
    return this.http.post(url, formData)
  }
  licenceClassList(){
    const url = this.apiService.getUrl("LicenceClasses");
    return this.http.get(url)
  }
  licenceClassDelete(id){
    const url = this.apiService.getUrl(`LicenceClasses/${id}`);
    return this.http.delete(url);
  }
  licenceClassEdit(id, formData){
    const url = this.apiService.getUrl(`LicenceClasses/${id}`);
    return this.http.put(url, formData);
  }
  licenceClassGetData(id){
    const url = this.apiService.getUrl(`LicenceClasses/${id}`);
    return this.http.get(url);
  }
}
