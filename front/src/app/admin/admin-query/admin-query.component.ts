import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../serv/stats.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-query',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './admin-query.component.html',
  styleUrls: ['./admin-query.component.scss'],
})
export class AdminQueryComponent implements OnInit {
  totalUsers: number = 0;
  mostPopularSpecie: string = '';
  totalAppointments: number = 0;
  isLoading: boolean = true;

  constructor(private stats: StatsService) {}

  ngOnInit() {
    this.stats.getAppointmentsLastMonth().subscribe((data) => {
      this.totalAppointments = data.totalAppointments;
      this.checkIfLoadingComplete();
    });

    this.stats.getUsersLastMonth().subscribe((data) => {
      this.totalUsers = data.totalUsers;
      this.checkIfLoadingComplete();
    });

    this.stats.getMostPopularSpecie().subscribe((data) => {
      this.mostPopularSpecie = data.mostPopularSpecies;
      this.checkIfLoadingComplete();
    });
  }

  checkIfLoadingComplete() {
    if (
      this.totalUsers !== 0 &&
      this.totalAppointments !== 0 &&
      this.mostPopularSpecie !== ''
    ) {
      this.isLoading = false;
    }
  }
}
