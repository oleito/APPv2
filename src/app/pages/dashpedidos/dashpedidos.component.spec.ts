import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashpedidosComponent } from './dashpedidos.component';

describe('DashpedidosComponent', () => {
  let component: DashpedidosComponent;
  let fixture: ComponentFixture<DashpedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashpedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashpedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
