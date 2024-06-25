import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../serv/stats.service';

@Component({
  selector: 'app-admin-query',
  standalone: true,
  imports: [],
  templateUrl: './admin-query.component.html',
  styleUrl: './admin-query.component.scss'
})
export class AdminQueryComponent implements OnInit {
  totalUsers: number = 0;
  mostPopularSpecie: string = '';
  totalAppointments: number = 0;

  constructor(private stats: StatsService) {}

  ngOnInit() {
    this.stats.getAppointmentsLastMonth().subscribe((data) => {
      this.totalAppointments = data.totalAppointments;
    });

    this.stats.getUsersLastMonth().subscribe((data) => {
      this.totalUsers = data.totalUsers;
    });

    this.stats.getMostPopularSpecie().subscribe((data) => {
      this.mostPopularSpecie = data.mostPopularSpecies;
    });
  }
}
