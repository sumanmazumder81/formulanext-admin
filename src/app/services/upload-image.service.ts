import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private apiService: ApiService, private http: HttpClient) { }

  uploadDdocumnts(data): Observable<any> {
    const url = this.apiService.getUrl("Photos");
    return this.http.put(url, data);
  }
  deleteDdocumnts(entityType, entityId, photoKey): Observable<any> {
    const url = this.apiService.getUrl(`Photos?entityType=${entityType}&entityId=${entityId}&photoKey=${photoKey}`);
    return this.http.delete(url);
  }
}
