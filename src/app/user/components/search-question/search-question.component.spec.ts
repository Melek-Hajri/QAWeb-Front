import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQuestionComponent } from './search-question.component';

describe('SearchQuestionComponent', () => {
  let component: SearchQuestionComponent;
  let fixture: ComponentFixture<SearchQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchQuestionComponent]
    });
    fixture = TestBed.createComponent(SearchQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
