import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';
import { CommonModule } from '@angular/common';
import { GraphComponent } from '../graph/graph.component';
import { AdminQueryComponent } from '../admin-query/admin-query.component';
import { TableComponent } from '../table/table.component';
import { AccesibilidadService } from '../boton-accesibilidad/accesibilidad.service';
import { LectorPantallaService } from '../../static/home/lector-pantalla.service';
import { BotonAccesibilidadComponent } from '../boton-accesibilidad/boton-accesibilidad.component';

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
    BotonAccesibilidadComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  title = 'acccesibilidad';

  constructor(
    public accesibilidad: AccesibilidadService, 
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private lectorPantalla: LectorPantallaService
  ) {}

  ngAfterViewInit() {
    // Obtener el elemento raíz
    const rootElement = this.elementRef.nativeElement;

    // Crear un array para guardar todos los elementos hoja
    const leafElements: Element[] = [];

    const collectLeafElements = (element: Element) => {
      if (element.children.length === 0) {
        leafElements.push(element);
      } else {
        Array.from(element.children).forEach((child: Element) => {
          collectLeafElements(child);
        });
      }
    };

    // Iniciar la recolección desde el elemento raíz
    collectLeafElements(rootElement);

    // Añadir eventos de hover a todos los elementos hoja recolectados
    leafElements.forEach((element: Element) => {
      this.renderer.listen(element, 'mouseenter', () => {
        let htmlElement = element as HTMLElement;
        // Check if it has text then print it
        let text = htmlElement.textContent;
        if (text && this.accesibilidad.getScreenReader()) {
          htmlElement.style.backgroundColor = 'lavender';
          this.lectorPantalla.leer(text);
          console.log(text)
        }
      });

      this.renderer.listen(element, 'mouseleave', () => {
        (element as HTMLElement).style.backgroundColor = '';
      });
    });
  }  
}
