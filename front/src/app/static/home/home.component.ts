import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';
import { Router } from '@angular/router';
import { YoutubeVideoDialogComponent } from '../../comp/youtube-video-dialog/youtube-video-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BotonAccesibilidadComponent } from '../../admin/boton-accesibilidad/boton-accesibilidad.component';
import { AccesibilidadService } from '../../admin/boton-accesibilidad/accesibilidad.service';
import { LectorPantallaService } from './lector-pantalla.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, BotonAccesibilidadComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public accesibilidad: AccesibilidadService, 
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private lectorPantalla: LectorPantallaService
  ) {}

  goToPets() {
    this.router.navigate(['/gallery']);
  }
  
  openVideo() {
    const dialogRef = this.dialog.open(YoutubeVideoDialogComponent)
  }

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
