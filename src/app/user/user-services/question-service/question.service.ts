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

  postQuestionImage(files: File[], questionId: number): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file)); // Use 'files' as the key

    return this.http.post<[]>(`${BASE_URL}api/image/${questionId}`, formData, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllQuestions(pageNumber: number): Observable<any> {
    return this.http.get<[]>(`${BASE_URL}api/questions/${pageNumber}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getQuestionsByUserId(pageNumber: number): Observable<any> {
    return this.http.get<[]>(`${BASE_URL}api/questions/${StorageService.getUserId()}/${pageNumber}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getQuestionById(questionId: number): Observable<any> {
    return this.http.get<[]>(`${BASE_URL}api/question/${questionId}/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader()
    });
  }  

  searchQuestionByTitle(title: string, pageNum: number): Observable<any> {
    return this.http.get<[]>(`${BASE_URL}api/search/${title}/${pageNum}`, {
      headers: this.createAuthorizationHeader()
    });
  }  

  getLatestQuestions(pageNum: number): Observable<any> {
    return this.http.get<[]>(`${BASE_URL}api/questions/latest/${pageNum}`, {
      headers: this.createAuthorizationHeader()
    });
  } 

  getHighestVotedQuestions(pageNum: number): Observable<any> {
    return this.http.get<[]>(`${BASE_URL}api/questions/highest_voted/${pageNum}`, {
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
