import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-question',
  templateUrl: './search-question.component.html',
  styleUrls: ['./search-question.component.scss']
})
export class SearchQuestionComponent implements OnInit {

  titleForm: FormGroup = this.fb.group({
    titleTag: [null, Validators.required]
  });
  pageNum: number = 0;
  pageSize: number = 5;
  questions: any[] = [];
  total: number = 0;

  constructor(private questionService: QuestionService, private fb: FormBuilder) {}

  ngOnInit() {
    this.titleForm = this.fb.group({
      titleTag: [null, Validators.required]
    });
    this.searchQuestionByTitleAndTag();
  }

  searchQuestionByTitleAndTag() {
    console.log(this.titleForm.value);
    this.questionService.searchQuestionByTitleAndTag(this.titleForm.controls['titleTag'].value, this.pageNum).subscribe(
      (res) => {
        console.log(res);
        this.questions = res.questionDTOList;
        this.total = res.totalElements; // Set total elements
      }
    );
  }

  pageIndexChange(event: any) {
    this.pageNum = event.pageIndex;
    this.searchQuestionByTitleAndTag();
  }

}
