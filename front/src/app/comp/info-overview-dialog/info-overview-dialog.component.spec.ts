import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOverviewDialogComponent } from './info-overview-dialog.component';

describe('InfoOverviewDialogComponent', () => {
  let component: InfoOverviewDialogComponent;
  let fixture: ComponentFixture<InfoOverviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoOverviewDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
