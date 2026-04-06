import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenOrOddComponent } from './even-or-odd.component';

describe('EvenOrOddComponent', () => {
  let component: EvenOrOddComponent;
  let fixture: ComponentFixture<EvenOrOddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenOrOddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvenOrOddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
