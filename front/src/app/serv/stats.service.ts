import { Injectable } from '@angular/core';
import { WebAPIService } from './web/web-api.service';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  baseURL = ' https://backend.diegomagdaleno.tech';

  constructor(private web: WebAPIService) {}

  getStatsForGraph() {
    return this.web.get(`${this.baseURL}/stats`);
  }

  getUsersLastMonth() {
    return this.web.get(`${this.baseURL}/stats/users`);
  }

  getMostPopularSpecie() {
    return this.web.get(`${this.baseURL}/stats/popular`);
  }

  getAppointmentsLastMonth() {
    return this.web.get(`${this.baseURL}/stats/app-month`);
  }
}
