import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserGuard } from '../auth-guards/user-guard/user.guard';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { ViewQuestionComponent } from './components/view-question/view-question.component';
import { GetQuestionsBuUseridComponent } from './components/get-questions-bu-userid/get-questions-bu-userid.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [UserGuard] },
  { path: "question", component: PostQuestionComponent, canActivate: [UserGuard] },
  { path: "question/:questionId", component: ViewQuestionComponent, canActivate: [UserGuard] },
  { path: "my_questions", component: GetQuestionsBuUseridComponent, canActivate: [UserGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
