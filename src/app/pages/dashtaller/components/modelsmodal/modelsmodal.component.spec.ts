import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsmodalComponent } from './modelsmodal.component';

describe('ModelsmodalComponent', () => {
  let component: ModelsmodalComponent;
  let fixture: ComponentFixture<ModelsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
