import { Injectable, Injector } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
declare var unescape: any;
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ServiceClass
{
  APIURL = 'https://api.bitfinex.com/v1/';

  protected http: Http;

  constructor(private injector: Injector)
  {
    this.http = this.injector.get(Http);
  }


  /**
 * http Get
 * @param path
 * @param param
 */
  get(path: string): Observable<Response>
  {
    return this.http.get(this.APIURL + path, {
      headers: <Headers>this.getHeader()

    });
  }

  private getHeader(): Headers
  {
    var authHeader = new Headers({ 'Content-Type': 'application/json' });
    authHeader.append('Access-Control-Allow-Origin', '*');

    return authHeader;
  }

}

