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
    // console.log(file.name, '2');
    formData.append('file', file);
    // console.log(formData.get('file'), '3');
    // console.log(formData);

    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    return this.http.post(this.baseApiUrl, formData);
  }
}
