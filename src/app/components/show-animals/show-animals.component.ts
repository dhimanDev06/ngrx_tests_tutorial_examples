import { Component, inject, OnInit } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackToHomeComponent } from '../back-to-home/back-to-home.component';
import { AnimalData } from '../../interfaces/animal-data.interface';
import { Store } from '@ngrx/store';
import * as Actions from '../../actions/animals.action';
import { EMPTY, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AnimalSearch } from '../../interfaces/animal-search.interface';

@Component({
  selector: 'app-show-animals',
  imports: [
    BackToHomeComponent,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './show-animals.component.html',
  styleUrl: './show-animals.component.scss'
})
export class ShowAnimalsComponent implements OnInit {

  data$?: Observable<AnimalData>;

  animalForm: UntypedFormGroup = new FormGroup({});

  private _allAnimals: string[] = [];

  private animalService = inject(AnimalService);
  private fb = inject(FormBuilder);
  private store = inject(Store<{ data: AnimalData }>);

  ngOnInit(): void {
    this.animalForm = this.fb.group({
      animalName: ['']
    });

    this.data$ = this.store.select(store => store.animals);
    const animalName$ = this.store.select(store => store.animal_search);

    if(animalName$) {
      animalName$.pipe(
        switchMap((data: AnimalSearch) => {
          if(data) {
            return of(data.animalName);
          } else {
            return EMPTY;
          }
        })
      ).subscribe((animalName: string) => {
        this.animalForm.controls['animalName'].patchValue(animalName, {emitEvent: false});
      })
    }

    this.animalService.getAnimals().subscribe((result: string[]) => {
      this._allAnimals = result;
    });

    this.animalForm.controls['animalName'].valueChanges.pipe(
      switchMap((data: string) => {
        if(data.length >= 3) {
          this.store.dispatch(Actions.setSearchFor({payload: {animalName: data}}));
          return of(data.toLowerCase());
        }

        this.store.dispatch(Actions.setSearchFor({payload: {animalName: data}}));
        return of('');
      })
    ).subscribe((data: string) => {
      if(data) {
        const foundAnimals: string[] = structuredClone(this._allAnimals).filter(item => item.toLowerCase().indexOf(data) > -1);
        this.store.dispatch(Actions.setAnimals({payload: {data: foundAnimals}}));
      } else {
        this.store.dispatch(Actions.setAnimals({payload: {data: []}}));
      }      
    });
  }

}