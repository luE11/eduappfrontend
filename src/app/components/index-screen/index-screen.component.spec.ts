import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexScreenComponent } from './index-screen.component';

describe('IndexScreenComponent', () => {
  let component: IndexScreenComponent;
  let fixture: ComponentFixture<IndexScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexScreenComponent]
    });
    fixture = TestBed.createComponent(IndexScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
