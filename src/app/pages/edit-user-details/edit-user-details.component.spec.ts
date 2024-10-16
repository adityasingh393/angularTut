import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserDetailsComponent } from './edit-user-details.component';

describe('EditUserDetailsComponent', () => {
  let component: EditUserDetailsComponent;
  let fixture: ComponentFixture<EditUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
