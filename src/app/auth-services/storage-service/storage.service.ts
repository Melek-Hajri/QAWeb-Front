import { Injectable } from '@angular/core';

const TOKEN = 'c_token';
const USER = 'c_user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static hasToken(): boolean {
    return !!this.getToken();
  }

  public saveUser(user: any) {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN) || '';
  }

  static isUserLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN); // Return true if token exists, otherwise false
  }

  static logout() {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    if(user != null) {
      return JSON.parse(user);
    }
  }

  static getUserId(): string {
    const user = this.getUser();
    if(user == null) { return '';}
    return user.userId;
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
