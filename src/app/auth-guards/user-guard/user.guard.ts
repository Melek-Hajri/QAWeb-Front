import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "src/app/auth-services/storage-service/storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!StorageService.hasToken()) {
      this.router.navigateByUrl("/login");
      this.snackBar.open(
        "You are not logged in, please log in first",
        "close",
        { duration: 5000 }
      );
      return false;
    }
    return true;
  }
}
