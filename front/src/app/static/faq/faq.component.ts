import { Component } from '@angular/core';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { BotonAccesibilidadComponent } from '../../admin/boton-accesibilidad/boton-accesibilidad.component';
import { AccesibilidadService } from '../../admin/boton-accesibilidad/accesibilidad.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../comp/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NavbarComponent, BotonAccesibilidadComponent, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  
  faqs = [
    {
      question: '¿Cómo puedo adoptar un gato o perro?',
      answer: 'Para adoptar, visita nuestro refugio durante el horario de atención o completa el formulario de adopción en nuestro sitio web.'
    },
    {
      question: '¿Cuál es el proceso de adopción?',
      answer: 'El proceso incluye una entrevista, una visita al hogar y la firma de un contrato de adopción.'
    },
    {
      question: '¿Qué debo llevar el día de la adopción?',
      answer: 'Por favor, trae una identificación válida y un comprobante de domicilio.'
    },
    {
      question: '¿Cuál es el costo de adopción?',
      answer: 'El costo varía según el animal, pero generalmente incluye vacunas, esterilización y un chequeo veterinario.'
    },
    {
      question: '¿Puedo devolver el animal si no me adapto?',
      answer: 'Sí, aceptamos devoluciones de animales dentro de los primeros 30 días y trabajaremos contigo para encontrar una mejor solución.'
    }
  ];

  constructor(public accesibilidad: AccesibilidadService) {}
}
