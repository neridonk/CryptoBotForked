import { Component } from '@angular/core';
import { BifiService } from "./services/bifi.service";
import { Ticker } from "./models/ticker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  tickers: Ticker[] = new Array();

  constructor(private bifiService : BifiService)
  {
    this.fetchTicker();
  }

  private fetchTicker()
  {
    this.bifiService.GetTicker().subscribe(data =>
    {
      debugger;
      this.tickers.push(data);

      setTimeout(() =>
      {
        this.fetchTicker();
      },1000);

    });
  }
 
}
