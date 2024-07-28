import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';

@Component({
  selector: 'app-get-questions-bu-userid',
  templateUrl: './get-questions-bu-userid.component.html',
  styleUrls: ['./get-questions-bu-userid.component.scss']
})
export class GetQuestionsBuUseridComponent {
  questions: any[] =  [];
  pageNum: number = 0;
  total: number = 0;

  constructor(private service: QuestionService) {}


  ngOnInit() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.service.getQuestionsByUserId(this.pageNum).subscribe((res) => {
      console.log(res);
      this.questions = res.questionDTOList;
      this.total = res.totalElements;
    })
  }

  pageIndexChange(event: any) {
    this.pageNum = event.pageIndex;
    this.getAllQuestions();
  }
}

