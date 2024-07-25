import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQuestionsBuUseridComponent } from './get-questions-bu-userid.component';

describe('GetQuestionsBuUseridComponent', () => {
  let component: GetQuestionsBuUseridComponent;
  let fixture: ComponentFixture<GetQuestionsBuUseridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetQuestionsBuUseridComponent]
    });
    fixture = TestBed.createComponent(GetQuestionsBuUseridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
