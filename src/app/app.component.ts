import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { AppointmentComponent } from './comp/appointment/appointment.component';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [RouterOutlet, MatFormFieldModule, MatInputModule, MatDatepickerModule, AppointmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nicofugio';
}
