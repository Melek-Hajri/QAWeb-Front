import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from './auth-services/storage-service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'QAWeb-front';

  isUserLoggedIn: boolean = false;
  isUserAdmin: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.updateUserLoggedInStatus();
    
    
    console.log(StorageService.getUser());
    console.log(this.isUserAdmin);
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.updateUserLoggedInStatus();
      }
    })
  }

  private updateUserLoggedInStatus(): void {
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
    this.isUserAdmin = StorageService.getUser()?.isAdmin;
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
