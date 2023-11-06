import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcheckinComponent } from './groupcheckin.component';

describe('GroupcheckinComponent', () => {
  let component: GroupcheckinComponent;
  let fixture: ComponentFixture<GroupcheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupcheckinComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupcheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
