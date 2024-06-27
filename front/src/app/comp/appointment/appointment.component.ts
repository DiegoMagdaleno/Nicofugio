import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  AbstractControl,
  AsyncValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppointmentsService } from '../../serv/appointments.service';
import { Appointment } from '../../model/appointment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { EmailService } from '../../serv/email.service';
import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatTimepickerModule,
  MatNativeDateTimeModule,
} from '@dhutaryan/ngx-mat-timepicker';

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
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointments: Appointment[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 1));
  @Input() petId: number = 0;

  baseURL = ' https://backend.diegomagdaleno.tech/';

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private appointmentService: AppointmentsService,
    private router: Router,
    private toaster: ToastrService,
    private auth: Auth,
    private email: EmailService
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      date: ['', Validators.required],
      notes: '',
      time: new FormControl(
        { value: '', disabled: true },
        {
          validators: [Validators.required],
          asyncValidators: [this.canBeScheduled()],
          updateOn: 'blur',
        }
      ),
    });

    this.appointments = this.appointmentService.getAppointments();

    this.appointmentForm.get('date')?.valueChanges.subscribe(() => {
      this.onDateChange();
    });
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
    const currentUser = this.auth.currentUser!;
    const appointmentDetails = {
      ...this.appointmentForm.value,
      petId: this.petId,
      email: currentUser.email,
      phone: currentUser.phoneNumber,
      name: currentUser.displayName,
    };

    this.appointmentService
      .addAppointment(appointmentDetails as Appointment)
      .subscribe((data: any) => {
        this.email.sendAppointmentEmail(data.id).subscribe((res) => {
          this.appointmentForm.reset();
          Object.keys(this.appointmentForm.controls).forEach((key) => {
            this.appointmentForm.get(key)?.setErrors(null);
          });
          this.router.navigate(['/gallery']);
          this.toaster.success('Cita agendada con éxito', '¡Éxito!');
        });
      });
  }

  containsSpaceSeparator(control: FormControl): ValidationErrors | null {
    if (control.value && !/\s/.test(control.value)) {
      return { noSpace: true };
    }
    return null;
  }

  canBeScheduled = (): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      const time = control.value;
      const dateTime = new Date(time);
      if (!dateTime) return of(null);

      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      const date = control.parent?.get('date')?.value;
      if (!date) return of(null);

      const dateString = this.datePipe.transform(date, 'dd/MM/yyyy');
      if (!dateString) return of(null);

      return this.appointmentService.getAllAppointments().pipe(
        map((appointments: Appointment[]) => {
          const collectedAppointments = appointments.filter(
            (a) => a.petId === this.petId && a.date === dateString
          );

          if (!collectedAppointments.length) return null;

          const timeD = new Date();
          timeD.setMinutes(minutes);
          timeD.setHours(hours);
          const dateTimeString = this.datePipe.transform(timeD, 'HH:mm');
          if (!dateTimeString) return null;

          const appointment = collectedAppointments.find(
            (a) => a.time === dateTimeString
          );
          if (appointment) {
            return { invalidTime: true };
          }
          return null;
        })
      );
    };
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
