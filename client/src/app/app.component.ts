import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from './weather';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'docker-school';

  weatherForcast$!: Observable<Weather[]>;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.weatherForcast$ = this.weatherService.getForcast();
  }
}
