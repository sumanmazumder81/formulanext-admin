import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { PostUserEntityManagerService } from './post-user-entity-manager.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OwnerAddService {

  constructor(private apiService: ApiService, 
    private http: HttpClient,
    private postEntity: PostUserEntityManagerService,
    private _router: Router
    ) { 
    postEntity.getMessage().subscribe(
      (data)=>{
        if(data.Message === "UECreated" && data.caller === "owner"){
          // ownerAdd({data.UE_id})
        }
      }
    )
  }

  ownerAdd(body){
    const url = this.apiService.getUrl("Owners");
    return this.http.post(url, body);
  }
  // userEntities(data:any){
  //   const url = this.apiService.getUrl("UserEntities");
  //   return this.http.post(url, data);
  // }
}

