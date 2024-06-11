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
    'https://gist.githubusercontent.com/DiegoMagdaleno/d1293fe76c253c22479c0c9f23132327/raw/ede111e5de0f7a4bb35895077bc49e1841b3ee2a/pets.json';
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
