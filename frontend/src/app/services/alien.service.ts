import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlienService {
  /**
   *
   * @param http
   */
  constructor(private readonly http: HttpClient) {}

  /**
   *
   */
  getData(): Observable<any> {
    // console.log('GET');
    return this.http.get('http://localhost:1337/messages');
    // return new Observable();
    // return new Observable()
  }

  /**
   *
   */
  sendData(data: any): Observable<any> {
    console.log('SENDING', data);
    return this.http.post('http://localhost:1337/messages', data, {
      headers: { 'x-api-key': 'asdasf' },
    });
  }
}
