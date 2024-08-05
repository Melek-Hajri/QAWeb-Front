import { Component } from '@angular/core';
import { UserService } from '../../admin-services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';




@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss']
})
export class UsersDashboardComponent {

  users: any[] =  [];
  pageNum: number = 0;
  total: number = 0;

  constructor(private service: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }
  
  getAllUsers() {
    this.service.getAllUsers(this.pageNum, StorageService.getUserId()).subscribe((res) => {
      console.log(res);
      this.users = res.userDTOList;
      this.total = res.totalElements;
    })
  }

  pageIndexChange(event: any) {
    this.pageNum = event.pageIndex;
    this.getAllUsers();
  }

  deactivateUser(userId: number) {
    this.service.deactivateUser(userId).subscribe(() => {
      this.getAllUsers();
      this.snackBar.open("User deactivated successfully", "close", { duration: 5000 });
    });
  }

  activateUser(userId: number) {
    this.service.activateUser(userId).subscribe(() => {
      this.getAllUsers();
      this.snackBar.open("User activated successfully", "close", { duration: 5000 });
    });
  }

  makeAdmin(userId: number) {
    this.service.makeAdmin(userId).subscribe(() => {
      this.getAllUsers();
      this.snackBar.open("User granted admin rights successfully", "close", { duration: 5000 });
    });
  }

}
