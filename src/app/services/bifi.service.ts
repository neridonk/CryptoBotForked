import { Injectable, Injector } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { ServiceClass } from "./serviceClass";
import { Ticker } from "../models/ticker";

@Injectable()
export class BifiService extends ServiceClass {

  constructor(injector: Injector)
  {
    super(injector);
  }

  /**
  * Get Ticker
  */
  GetTicker(): Observable<Ticker>
  {
    return this.get('pubticker//btcusd').map((response) =>
    {
      return <Ticker>response.json();
    });
  }


}
