import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Declaracion de variables
  apiUrl: string;

  constructor(private httpClient: HttpClient) {

    this.apiUrl = 'http://localhost/Proyectos/APItallerV2/public/'; // SERVIDOR LOCAL
  }

  /**
   * Se declaran los metodos que nos conectaran con la API Rest
   */

  getData(endpoint: string): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.get(this.apiUrl + endpoint);
  }

  postData(endpoint: string, datos: any): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.post(this.apiUrl + endpoint, datos);
  }

  putData(endpoint: string, datos: any): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.put(this.apiUrl + endpoint, datos);
  }

  deleteData(endpoint: string): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.delete(this.apiUrl + endpoint);
  }

}
