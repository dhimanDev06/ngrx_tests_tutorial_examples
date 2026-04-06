import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private _animals: string[] = [
    'Bearded Dragon',
    'Birds',
    'Cat',
    'Chicken',
    'Cow',
    'Dog',
    'Ferret',
    'Fish',
    'Goat',
    'Goldfish',
    'Guinea pig',
    'Hamster',
    'Hermit crabs',
    'Horse',
    'Lizard',
    'Mouse',
    'Parrot',
    'Pets',
    'Rabbit',
    'Rat',
    'Sheep',
    'Snake',
    'Turtle'
  ];
  
  getAnimals(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      observer.next(this._animals);
      observer.complete();
    });
  }

}