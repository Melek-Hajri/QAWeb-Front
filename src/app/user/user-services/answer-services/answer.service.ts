import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

const BASE_URL = 'http://localhost:8085/';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  postAnswer(answerDTO: any): Observable<any> {
    return this.http.post<[]>(BASE_URL + "api/answer", answerDTO, 
      {
        headers: this.createAuthorizationHeader()
      }
    );
  }

  postAnswerImage(files: File[], answerId: number | null, questionId: number | null): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    // Construct the query parameters based on available IDs
    let params = new HttpParams();
    if (answerId) {
        params = params.set('answerId', answerId.toString());
    }
    if (questionId) {
        params = params.set('questionId', questionId.toString());
    }

    return this.http.post<[]>(`${BASE_URL}api/image`, formData, {
        headers: this.createAuthorizationHeader(),
        params: params
    });
  }

  approveAnswer(answerId: number): Observable<any> {
    return this.http.get<[]>(`${BASE_URL}api/answer/${answerId}`,
      {
        headers: this.createAuthorizationHeader()
      }
    );
  }

  postCommentToAnswer(commentDTO: any): Observable<any> {
    return this.http.post<[]>(BASE_URL + "api/answer/comment", commentDTO, 
      {
        headers: this.createAuthorizationHeader()
      }
    );
  }


  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      "Authorization", "Bearer " + StorageService.getToken()
    )
  }
}
