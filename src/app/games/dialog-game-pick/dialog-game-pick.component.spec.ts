import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGamePickComponent } from './dialog-game-pick.component';

describe('DialogGamePickComponent', () => {
  let component: DialogGamePickComponent;
  let fixture: ComponentFixture<DialogGamePickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogGamePickComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogGamePickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
