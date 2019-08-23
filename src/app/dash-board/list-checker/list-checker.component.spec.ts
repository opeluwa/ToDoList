import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckerComponent } from './list-checker.component';

describe('ListCheckerComponent', () => {
  let component: ListCheckerComponent;
  let fixture: ComponentFixture<ListCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
