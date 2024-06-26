import { Injectable } from '@angular/core';
import { ScreenReader } from '@capacitor/screen-reader';

@Injectable({
  providedIn: 'root'
})
export class LectorPantallaService {

  constructor() { }

  async leer(text: string) {
    await ScreenReader.speak({ value: text });
  }
}
