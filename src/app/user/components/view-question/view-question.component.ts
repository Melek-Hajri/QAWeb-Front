import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { AnswerService } from '../../user-services/answer-services/answer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VoteService } from '../../user-services/vote-services/vote.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent {
  questionId: number = this.activatedRoute.snapshot.params["questionId"];
  question: any;
  validateForm: FormGroup = this.fb.group({
    body: [null, Validators.required]
  });
  answers: any[] = [];
  comments: any[] = [];
  similarQuestions: any[] = [];
  displayButton: boolean = false;


  selectedFiles: { file: File; preview: string | ArrayBuffer | null }[] = [];

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private voteService: VoteService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getQuestionById();
  }

  getQuestionById() {
    this.questionService.getQuestionById(this.questionId).subscribe(
      (res) => {
        console.log(res);
        this.question = res.questionDTO;
        if (res.questionDTO.files) {
          this.question.convertedImgs = res.questionDTO.files.map((file: any) => 'data:image/jpeg;base64,' + file.data);
          console.log(this.question.convertedImgs);
        }
        this.answers = res.answerDTOList.map((element: any) => {
          if (element.files) {
            element.convertedImgs = element.files.map((file: any) => 'data:image/jpeg;base64,' + file.data);
          }
          return element;
        });
        if (res.commentDTOList) {
          this.comments = res.commentDTOList;
        }
        if (res.similarQuestionsDTOList) {
          this.similarQuestions = res.similarQuestionsDTOList;
        }
        if(StorageService.getUserId() == this.question.userId) {
          this.displayButton = true;
        } else {
          this.displayButton = false;
        }
      }
    );
  }

  

  addAnswer() {
    console.log(this.validateForm.value);
    const data = this.validateForm.value;
    data.questionId = this.questionId;
    data.userId = StorageService.getUserId();

    console.log(data);
    this.answerService.postAnswer(data).subscribe((res) => {
      console.log(res);
      const answerId = res.id;
      this.answerService.postAnswerImage(this.selectedFiles.map(fileObj => fileObj.file), answerId, null).subscribe(
        (res) => {
          console.log("Post Answer Image API", res);
        }
      );
      if (answerId != null) {
        this.snackBar.open("Answer posted successfully", "close", { duration: 5000 });
        this.getQuestionById();
      } else {
        this.snackBar.open("Something went wrong", "close", { duration: 5000 });
      }
    });
  }

  onFileSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    this.selectedFiles = files.map(file => {
      const reader = new FileReader();
      let filePreview: string | ArrayBuffer | null = null;

      reader.onload = () => {
        filePreview = reader.result;
        this.selectedFiles = this.selectedFiles.map(f => f.file === file ? { file, preview: filePreview } : f);
      };

      reader.readAsDataURL(file);
      return { file, preview: null };
    });
  }

  addVoteToQuestion(voteType: string) {
    if (this.question.voted == 1 || this.question.voted == -1) {
      this.voteService.cancelQuestionVote(this.questionId).subscribe(() => {
        this.getQuestionById();
      });
      this.snackBar.open("Vote cancelled", "close", { duration: 5000 });
    } else {
      console.log(voteType);
      const data = {
        voteType: voteType,
        userId: StorageService.getUserId(),
        questionId: this.questionId
      };
      this.voteService.addVote(data).subscribe((res) => {
        console.log(res);
        if (res.id != null) {
          this.snackBar.open("Vote added successfully", "close", { duration: 5000 });
          this.getQuestionById();
        } else {
          this.snackBar.open("Something went wrong", "close", { duration: 5000 });
        }
      });
    }
  }

  addVoteToAnswer(voteType: string, answer: any) {
    if (answer.voted == 1 || answer.voted == -1) {
      this.voteService.cancelAnswerVote(answer.id).subscribe(() => {
        this.getQuestionById();
      });
      this.snackBar.open("Vote cancelled", "close", { duration: 5000 });
    } else {
      console.log(voteType);
      const data = {
        voteType: voteType,
        userId: StorageService.getUserId(),
        answerId: answer.id
      };
      this.voteService.addVote(data).subscribe((res) => {
        console.log(res);
        if (res.id != null) {
          this.snackBar.open("Vote added successfully", "close", { duration: 5000 });
          this.getQuestionById();
        } else {
          this.snackBar.open("Something went wrong", "close", { duration: 5000 });
        }
      });
    }
  }

  approveAnswer(answerId: number) {
    this.answerService.approveAnswer(answerId).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.snackBar.open("Answer approved successfully", "close", { duration: 5000 });
        this.getQuestionById();
      } else {
        this.snackBar.open("Something went wrong", "close", { duration: 5000 });
      }
    })
  }

  postCommentToAnswer(answerId: number, comment: string) {
    const commentDTO = {
      body: comment,
      answerId: answerId,
      userId: StorageService.getUserId()
    }
    this.answerService.postCommentToAnswer(commentDTO).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.snackBar.open("Comment added successfully", "close", { duration: 5000 });
        this.getQuestionById();
      } else {
        this.snackBar.open("Something went wrong", "close", { duration: 5000 });
      }
    })
  }

  

  postCommentToQuestion(comment: string) {
    const commentDTO = {
      body: comment,
      questionId: this.questionId,
      userId: StorageService.getUserId()
    }
    this.questionService.postCommentToQuestion(commentDTO).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.snackBar.open("Comment added successfully", "close", { duration: 5000 });
        this.getQuestionById();
      } else {
        this.snackBar.open("Something went wrong", "close", { duration: 5000 });
      }
    })
  }
}
