import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Appointment } from '../../model/appointment';
import { AppointmentsService } from '../../serv/appointments.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  appointments: Appointment[] = [];
  dataSource!: MatTableDataSource<Appointment>;
  displayedColumns: string[] = ["name", "email", "phone", "date", "time", "petId"];

  constructor(
    private appointmentService: AppointmentsService,
  ) {
    this.appointmentService.getAllAppointments().subscribe((appointments) => {
      this.appointments = appointments;
      this.dataSource = new MatTableDataSource(this.appointments);
      this.dataSource.paginator = this.paginator;
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
}
