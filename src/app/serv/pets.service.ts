import { Injectable } from '@angular/core';
import { Pet } from '../model/pet';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private apiUrl =
    'https://gist.githubusercontent.com/DiegoMagdaleno/d1293fe76c253c22479c0c9f23132327/raw/b606a3b377027f4ff263c5d43e0be733354750a9/pets.json';
  constructor(private http: HttpClient) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  getPet(id: number): Observable<Pet> {
    return this.getPets().pipe(
      map(pets => pets.find(p => p.id === id) as Pet)
    );
  }
}
