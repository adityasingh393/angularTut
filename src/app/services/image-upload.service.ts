import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  baseApiUrl = 'https://file.io/'; //i can pkcae any api url in this place 
  constructor(private http: HttpClient) {}
  upload(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseApiUrl, formData);
  }
}
