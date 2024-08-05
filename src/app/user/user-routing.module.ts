import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserGuard } from '../auth-guards/user-guard/user.guard';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { ViewQuestionComponent } from './components/view-question/view-question.component';
import { GetQuestionsBuUseridComponent } from './components/get-questions-bu-userid/get-questions-bu-userid.component';
import { SearchQuestionComponent } from './components/search-question/search-question.component';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { AdminGuard } from '../auth-guards/admin-guard/admin.guard';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [UserGuard] },
  { path: "question", component: PostQuestionComponent, canActivate: [UserGuard] },
  { path: "question/:questionId", component: ViewQuestionComponent, canActivate: [UserGuard] },
  { path: "my_questions", component: GetQuestionsBuUseridComponent, canActivate: [UserGuard] },
  { path: "search_question", component: SearchQuestionComponent, canActivate: [UserGuard] },
  { path: "users", component: UsersDashboardComponent, canActivate: [UserGuard, AdminGuard] },
  { path: "user/:userId", component: ViewUserComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
