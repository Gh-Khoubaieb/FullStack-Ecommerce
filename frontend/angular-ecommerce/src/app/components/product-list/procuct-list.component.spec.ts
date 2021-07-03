import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcuctListComponent } from './product-list.component';

describe('ProcuctListComponent', () => {
  let component: ProcuctListComponent;
  let fixture: ComponentFixture<ProcuctListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcuctListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcuctListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
