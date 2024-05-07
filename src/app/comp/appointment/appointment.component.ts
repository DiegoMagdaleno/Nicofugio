import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppointmentsService } from '../../serv/appointments.service';
import { Appointment } from '../../model/appointment';
import {
  MatNativeDateTimeModule,
  MatTimepickerModule,
} from '@dhutaryan/ngx-mat-timepicker';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PetsService } from '../../serv/pets.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [
    MatFormField,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatTimepickerModule,
    MatNativeDateTimeModule,
    MatButtonModule,
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  appointmentForm!: FormGroup;
  appointments: Appointment[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1));
  @Input() petId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private appointmentService: AppointmentsService,
    private router: Router,
    private toaster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      date: ['', Validators.required],
      name: [
        '',
        [
          Validators.required,
          this.containsSpaceSeparator,
          Validators.minLength(3),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      notes: '',
      time: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        this.canBeScheduled,
      ]),
    });

    this.appointments = this.appointmentService.getAppointments();
  }

  onSubmit(): void {
    const formatedDate = this.datePipe.transform(
      this.appointmentForm.value.date,
      'dd/MM/yyyy'
    );
    const formatedTime = this.datePipe.transform(
      this.appointmentForm.value.time,
      'HH:mm'
    );
    this.appointmentForm.value.date = formatedDate;
    this.appointmentForm.value.time = formatedTime;
    const appointmentDetails = {
      ...this.appointmentForm.value,
      petId: this.petId,
    }
    this.appointmentService.addAppointment(
      appointmentDetails as Appointment
    );
    this.appointmentForm.reset();
    Object.keys(this.appointmentForm.controls).forEach((key) => {
      this.appointmentForm.get(key)?.setErrors(null);
    });
    this.router.navigate(['/gallery']);
    this.toaster.success('Cita agendada con éxito', '¡Éxito!');
  }

  containsSpaceSeparator(control: FormControl): ValidationErrors | null {
    if (control.value && !/\s/.test(control.value)) {
      return { noSpace: true };
    }
    return null;
  }

  canBeScheduled = (formControl: FormControl): ValidationErrors | null => {
    if (!formControl.value) return null;
    const time = formControl.value;
    const dateTime = new Date(time);
    if (!dateTime) return null;
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const date = formControl.parent?.get('date')?.value;
    if (!date) return null;
    const dateString = this.datePipe.transform(date, 'dd/MM/yyyy');
    if (!dateString) return null;
    const appointments = this.appointmentService.getAppointmentsForPet(this.petId).filter(
      (a) => a.date === dateString
    );
    if (!appointments.length) return null;
    const roundedMinutes = Math.ceil(minutes / 15) * 15;
    let roundedHours = hours;
    if (roundedMinutes === 60) {
      roundedHours += 1;
    }
    const roundedTime = new Date();
    roundedTime.setHours(roundedHours);
    roundedTime.setMinutes(roundedMinutes);
    const roundedTimeString = this.datePipe.transform(roundedTime, 'HH:mm');
    if (!roundedTimeString) return null;
    const appointment = appointments.find((a) => a.time === roundedTimeString);
    if (appointment) {
      return { invalidTime: true };
    }
    return null;
  };

  onDateChange() {
    const dateControl = this.appointmentForm.get('date');
    const timeControl = this.appointmentForm.get('time');
    if (dateControl && dateControl.value) {
      timeControl?.enable();
    } else {
      timeControl?.disable();
    }
  }

  onCancel(): void {
    this.toaster.error('Cita cancelada', '¡Cancelado!');
    this.router.navigate(['/gallery']);
  }
}
