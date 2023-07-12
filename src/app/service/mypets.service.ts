import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {  Cake, User } from '../model/mypets.model';

const url = 'http://localhost:3000/api/user'

@Injectable({
  providedIn: 'root'
})
export class MypetsService {

  constructor(private http: HttpClient) { }

  getUsers () : Observable<User[]> {
    return this.http.get(url).pipe(map((data:any) => {
      return data.map((elem:any) => new User(elem))
    }))
  }

  addUser(user: User) : Observable<any> {
    return this.http.post(url + '/', user)
  }

  getOne(userId: number): Observable<User> {
    return this.http.get(url +  '/' + userId).pipe(map((data:any) => {
      return new User(data);
    }))
  }

  getCakes(): Observable<Cake[]> {
    return this.http.get('http://localhost:3000/api/cakes').pipe(map((data:any) => {
      return data.map((elem:any) => new Cake(elem))
    }))
  }
}
