import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListFilterComponent } from './user-list-filter.component';

describe('UserListFilterComponent', () => {
  let component: UserListFilterComponent;
  let fixture: ComponentFixture<UserListFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListFilterComponent]
    });
    fixture = TestBed.createComponent(UserListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
