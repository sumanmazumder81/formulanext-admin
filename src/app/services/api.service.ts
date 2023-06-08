import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiEndPoint :string;
  
  constructor() {
  }

  public getUrl(url: string): string {
    return `${environment.apiEndPoint}/${url}`;
  }
}
