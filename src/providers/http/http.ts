import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';


@Injectable()
export class HttpProvider {

  constructor(
    private http: HttpClient,
  ) { }

  post(url:string, data, headers: any = null): Observable<any> {
    let httpHeaders;
    
    if(headers) httpHeaders = new HttpHeaders(this.formatHeaders(headers));
    
    let body = this.parseBody(data);

    console.log(body);

    return this.http.post(url, body, {
        headers: httpHeaders
      }
    )
  }


  patch(url:string, data, headers: any = null): Observable<any> {
    let httpHeaders;
    
    if(headers) httpHeaders = new HttpHeaders(this.formatHeaders(headers));

    let body = this.parseBody(data);

    return this.http.patch(url, body, {
        headers: httpHeaders
      }
    )
  }

  
  get(url:string, headers: any = null): Observable<any> {
    let httpHeaders;
    
    if(headers) httpHeaders = new HttpHeaders(this.formatHeaders(headers));
    
    return this.http.get(url, {
      headers: httpHeaders
    })
  }
    
  delete(url: string, headers: any = null): Observable<any> {
    let httpHeaders;
    
    if(headers) httpHeaders = new HttpHeaders(this.formatHeaders(headers));

    return this.http.delete(url, {
      headers: httpHeaders
    })
  }
    
  private formatHeaders(headers) {
    for (var key in headers)
      if (headers.hasOwnProperty(key))
        if(typeof(headers[key]) !== 'string')
          headers[key] = headers[key] + '';

    return headers;
  }

  private parseBody(body) {
    const formData = new FormData();

    for (var key in body) {
      if (body.hasOwnProperty(key)) {
        var element = body[key];
        if(element) {
          formData.append(key, element);
        }
      }
    }
    
    return formData;
  }
}
