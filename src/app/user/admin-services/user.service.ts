import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

const BASE_URL = 'http://localhost:8085/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  getAllUsers(pageNumber: number): Observable<any> {
    return this.http.get<[]>(`${BASE_URL}api/users/${pageNumber}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  activateUser(userId: number): Observable<void> {
    return this.http.post<void>(`${BASE_URL}api/users/activate/${userId}`, {}, {
      headers: this.createAuthorizationHeader()
    });
  }
  
  deactivateUser(userId: number): Observable<void> {
    return this.http.post<void>(`${BASE_URL}api/users/deactivate/${userId}`, {}, {
      headers: this.createAuthorizationHeader()
    });
  }

  makeAdmin(userId: number): Observable<void> {
    return this.http.post<void>(`${BASE_URL}api/users/make_admin/${userId}`, {}, {
      headers: this.createAuthorizationHeader()
    });
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<[]>(`${BASE_URL}api/user/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  } 


  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization", "Bearer " + StorageService.getToken()
    )
  }
}
