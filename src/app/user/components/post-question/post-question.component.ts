import { Component, inject } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Tag {
  name: string;
}

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.scss']
})
export class PostQuestionComponent {

  tags: Tag[] = [];
  isSubmitting: boolean = false;
  addOnBlur = true;

  validateForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    tags: this.fb.array([], Validators.required),
    userId: [null, Validators.required] // Add userId here
  });

  readonly separatorKeyCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);

  get tagsArray() {
    return this.validateForm.get('tags') as FormArray;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push({ name: value });
      this.tagsArray.push(this.fb.control(value));
    }

    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.tagsArray.removeAt(index);
      this.announcer.announce(`Removed ${tag.name}`);
    }
  }

  edit(tag: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
      this.tagsArray.at(index).setValue(value);
    }
  }

  constructor(private service: QuestionService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar
            ) { }

  ngOnInit() {
    const userId = StorageService.getUserId(); 
    this.validateForm.get('userId')?.setValue(userId);
  }

  postQuestion() {
    console.log(this.validateForm.value); // Debugging line
    this.service.postQuestion(this.validateForm.value).subscribe((res) => {
      console.log(res);
      if(res.id != null) {
        this.snackBar.open("Question posted successfully", "close", { duration: 5000 });
      } else {
        this.snackBar.open("Something went wrong", "close", { duration: 5000 });
      }
    });
  }
}
