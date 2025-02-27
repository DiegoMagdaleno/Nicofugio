import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { WebAPIService } from '../../serv/web/web-api.service';
import { CommonModule } from '@angular/common';
import { BotonAccesibilidadComponent } from '../../admin/boton-accesibilidad/boton-accesibilidad.component';
import { AccesibilidadService } from '../../admin/boton-accesibilidad/accesibilidad.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule, BotonAccesibilidadComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  baseURL = ' https://backend.diegomagdaleno.tech';

  constructor(private web: WebAPIService, public accesibilidad: AccesibilidadService) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      txtName: new FormControl(''),
      txtEmail: new FormControl(''),
      txtMsg: new FormControl('')
    });
  }

  onSubmit() {
    this.web.post(`${this.baseURL}/email/contact`, {
      name: this.contactForm.value.txtName,
      email: this.contactForm.value.txtEmail,
      message: this.contactForm.value.txtMsg
    }).subscribe(() => {
      this.contactForm.reset();
    });
  }
}
