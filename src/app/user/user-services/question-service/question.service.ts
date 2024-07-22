import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

const BASE_URL = 'http://localhost:8085/';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  postQuestion(questionDTO: any): Observable<any> {
    return this.http.post<[]>(BASE_URL + "api/question", questionDTO, 
      {
        headers: this.createAuthorizationHeader()
      }
    );
  }

  getAllQuestions(pageNumber: number): Observable<any> {
    return this.http.get<[]>(`${BASE_URL}api/questions/${pageNumber}`, {
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
