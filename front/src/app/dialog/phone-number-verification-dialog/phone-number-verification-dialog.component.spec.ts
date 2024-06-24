import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberVerificationDialogComponent } from './phone-number-verification-dialog.component';

describe('PhoneNumberVerificationDialogComponent', () => {
  let component: PhoneNumberVerificationDialogComponent;
  let fixture: ComponentFixture<PhoneNumberVerificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneNumberVerificationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneNumberVerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
