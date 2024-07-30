import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../admin-services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {

  userId: number = this.activatedRoute.snapshot.params["userId"];
  user: any;
  questions: any[] = [];
  answers: any[] = [];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,

  ) {}

  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(this.userId).subscribe((res) => {
      console.log(res);
      this.user = res.userDTO;
      if(res.questionDTOList) {
        this.questions = res.questionDTOList;
      }
      if(res.answerDTOList) {
        this.answers = res.answerDTOList.map((element: any) => {
          if (element.files) {
            element.convertedImgs = element.files.map((file: any) => 'data:image/jpeg;base64,' + file.data);
          }
          return element;
        });
      }
    })
  }

}
