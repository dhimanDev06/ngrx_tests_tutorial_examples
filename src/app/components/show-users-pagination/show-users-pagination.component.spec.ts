import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsersPaginationComponent } from './show-users-pagination.component';

describe('ShowUsersPaginationComponent', () => {
  let component: ShowUsersPaginationComponent;
  let fixture: ComponentFixture<ShowUsersPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUsersPaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowUsersPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
