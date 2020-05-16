import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashtallerComponent } from './dashtaller.component';

describe('DashtallerComponent', () => {
  let component: DashtallerComponent;
  let fixture: ComponentFixture<DashtallerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashtallerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashtallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
