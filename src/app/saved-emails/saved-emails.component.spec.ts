import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEmailsComponent } from './saved-emails.component';

describe('SavedEmailsComponent', () => {
  let component: SavedEmailsComponent;
  let fixture: ComponentFixture<SavedEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedEmailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
