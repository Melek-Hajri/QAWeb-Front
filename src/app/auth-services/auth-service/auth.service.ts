import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';

const BASE_URL = 'http://localhost:8085/';
export const AUTH_HEADER = "authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "signup", signupRequest);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(BASE_URL + "login", {
      email,
      password
    },
      { observe: 'response' }
    ).pipe(
      tap(() => this.log("User Authentication")),
      map((res: HttpResponse<any>) => {
        this.storage.saveUser(res.body);
        const authHeader = res.headers.get(AUTH_HEADER);
        if (authHeader) {
          const tokenLength = authHeader.length;
          const bearerToken = authHeader.substring(7, tokenLength);
          this.storage.saveToken(bearerToken);
        }
        return res;
      })
    );
  }
  
  log(message: String): void {
    console.log("User Auth Service: " + message);
  }
}
