import {NavController, NavParams} from 'ionic-angular';
import {Weather} from '../../providers/weather/weather';
import {TemperaturePipe} from '../../pipes/Temperature';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'build/pages/forecast/forecast.html',
  pipes: [TemperaturePipe],
  provider: [Weather]
})
export class ForecastPage {
  public city;
  public forecast = [];
  
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public weather: Weather) {
    this.city = this.navParams.get('cityWeather');
    this.getForecast(this.city.id);
  }
  
  getForecast(cityId) {
    this.weather.forecast(cityId, 7)
      .map(data => data.json())
      .subscribe(
        data => {
          this.forecast = data.list;
          console.log('get forecast was called')
        },
        err => console.log('err: ' + err),
        () => console.log('forecast complete')
      )
  }
}
