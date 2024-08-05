import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

const BASE_URL = 'http://localhost:8085/';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  addVote(voteDTO: any): Observable<any> {
    return this.http.post<[]>(BASE_URL + "api/vote", voteDTO, 
      {
        headers: this.createAuthorizationHeader()
      }
    )
  }

  cancelQuestionVote(questionId: number) {
    return this.http.delete<[]>(`${BASE_URL}api/voteQuestionCancel/${StorageService.getUserId()}/${questionId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  cancelAnswerVote(answerId: number) {
    return this.http.delete<[]>(`${BASE_URL}api/voteAnswerCancel/${StorageService.getUserId()}/${answerId}`, {
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
