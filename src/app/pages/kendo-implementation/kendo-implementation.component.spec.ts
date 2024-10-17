import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoImplementationComponent } from './kendo-implementation.component';

describe('KendoImplementationComponent', () => {
  let component: KendoImplementationComponent;
  let fixture: ComponentFixture<KendoImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KendoImplementationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KendoImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
