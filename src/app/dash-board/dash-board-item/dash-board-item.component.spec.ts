import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardItemComponent } from './dash-board-item.component';

describe('DashBoardItemComponent', () => {
  let component: DashBoardItemComponent;
  let fixture: ComponentFixture<DashBoardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
