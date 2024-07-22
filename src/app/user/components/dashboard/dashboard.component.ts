import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  questions: any[] =  [];
  pageNum: number = 0;
  total: number = 0;

  constructor(private service: QuestionService) {}


  ngOnInit() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.service.getAllQuestions(this.pageNum).subscribe((res) => {
      console.log(res);
      this.questions = res.questionDTOList;
      this.total = res.totalPages * 5;
    })
  }

  pageIndexChange(event: any) {
    this.pageNum = event.pageIndex;
    this.getAllQuestions();
  }
}
