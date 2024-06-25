import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatekeeperDialogComponent } from './gatekeeper-dialog.component';

describe('GatekeeperDialogComponent', () => {
  let component: GatekeeperDialogComponent;
  let fixture: ComponentFixture<GatekeeperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatekeeperDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GatekeeperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
