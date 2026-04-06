import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { NumbersInterface } from '../../interfaces/numbers.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as Actions from '../../actions/even-or-odd.actions';
import { CommonModule } from '@angular/common';
import { BackToHomeComponent } from '../back-to-home/back-to-home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-even-or-odd',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    BackToHomeComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './even-or-odd.component.html',
  styleUrl: './even-or-odd.component.scss'
})
export class EvenOrOddComponent implements OnInit {

  data$?: Observable<NumbersInterface>;

  private store = inject(Store<{ evenOdd: NumbersInterface }>);
  private fb = inject(FormBuilder);

  numbersForm: UntypedFormGroup = new FormGroup({});

  protected showErrors: WritableSignal<string[]> = signal([]);

  ngOnInit() : void {
    this.data$ = this.store.select(store => store.evenOdd);

    this.numbersForm = this.fb.group({
      minimum: [0, [Validators.required, Validators.min(0), Validators.max(24)]],
      maximum: [10, [Validators.required, Validators.min(1), Validators.max(25)]],
      isEven: [true, Validators.required]
    });

    if(this.data$ != undefined) {
      this.data$.subscribe((result: NumbersInterface) => {
        this.numbersForm.patchValue(result);
      });
    }
  }

  submitForm() : void {
    let min: number = parseInt(this.numbersForm.get('minimum')?.value ?? '-1');
    let max: number = parseInt(this.numbersForm.get('maximum')?.value ?? '-1');

    if(this.numbersForm.valid && min < max) {
      this.showErrors.set([]);

      let arr: number[] = [];

      for(let i = min; i <= max; i++) {
        arr.push(i);
      }

      const data: NumbersInterface = {
        minimum: min,
        maximum: max,
        numbers: arr,
        isEven: (this.numbersForm.get('isEven')?.value) ? true : false
      };

      this.store.dispatch(Actions.setData({payload: data}))

      if(this.numbersForm.get('isEven')?.value) {
        this.store.dispatch(Actions.showEven());
      } else {
        this.store.dispatch(Actions.showOdd());
      }
    } else {
      let errors: string[] = ["There are some errors:"];

      if(min < 0 || min > 24) {
        errors.push("Invalid minimum value");
      }

      if(max < 1 || max > 25) {
        errors.push("Invalid maximum value");
      }

      if(min > max) {
        errors.push("Invalid: minimum value greater than maximum value");
      }

      this.showErrors.set(errors);
    }
  }

}