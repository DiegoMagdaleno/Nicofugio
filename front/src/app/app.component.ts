import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { AppointmentComponent } from './comp/appointment/appointment.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './static/home/home.component';
import { provideToastr } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter(), HttpClient],
  imports: [RouterOutlet, MatFormFieldModule, MatInputModule, MatDatepickerModule, AppointmentComponent, HttpClientModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Nicofugio';
}
