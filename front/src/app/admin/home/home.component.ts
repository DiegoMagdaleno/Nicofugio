import { AfterViewInit, Component } from '@angular/core';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';
import { CommonModule } from '@angular/common';
import { GraphComponent } from '../graph/graph.component';
import { AdminQueryComponent } from '../admin-query/admin-query.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    GraphComponent,
    AdminQueryComponent,
    TableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
