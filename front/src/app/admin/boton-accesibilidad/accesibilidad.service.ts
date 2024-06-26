import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccesibilidadService {
  screenReader: boolean = false;
  largeFont: boolean = false;
  highContrast: boolean = false;
  underLineLinks: boolean = false;

  constructor() { }

  setScreenReader (value: boolean){
    this.screenReader = value;
  }
  setLargeFont(value: boolean){
    this.largeFont = value;
  }
  setHighContrast(value:boolean){
    this.highContrast = value;
  }
  setUnderlineLinks(value:boolean){
    this.underLineLinks = value;
  }
  getScreenReader(){
    return this.screenReader;
  }
  getLargeFont(){
    return this.largeFont;
  }
  getHighContrast(){
    return this.highContrast;
  }
  getUnderlineLinks(){
    console.log(this.underLineLinks);
    return this.underLineLinks;
  }
}
