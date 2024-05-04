import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, ValidationErrors} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppointmentsService } from '../../serv/appointments.service';
import { Appointment } from '../../model/appointment';


@Component({
  selector: 'app-appointment',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [
    MatFormField,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export class AppointmentComponent {
  appointmentForm!: FormGroup;
  appointments: Appointment[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private appointmentService: AppointmentsService
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      date: ['', Validators.required],
      name: ['', [Validators.required, this.containsSpaceSeparator, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      notes: '',
    });

    this.appointments = this.appointmentService.getAppointments();
  }

  onSubmit(): void {
    const formatedDate = this.datePipe.transform(
      this.appointmentForm.value.date,
      'dd/MM/yyyy'
    );
    this.appointmentForm.value.date = formatedDate;
    this.appointmentService.addAppointment(
      this.appointmentForm.value as Appointment
    );
    this.appointmentForm.reset();
  }

  containsSpaceSeparator(control: FormControl): ValidationErrors | null {
    if (control.value && !/\s/.test(control.value)) {
      return { noSpace: true };
    }
    return null;
  }

  filterIt = (d: Date | null): boolean => {
    if (!d) return false;
    const dateString = this.datePipe.transform(d, 'dd/MM/yyyy');
    if (!dateString) return false;
    return !this.appointmentService.getAppointmentsAt(dateString).length;
  }
}
