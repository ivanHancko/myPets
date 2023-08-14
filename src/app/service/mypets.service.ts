import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pet, SlideShow, User } from '../model/mypets.model';

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

  getOne(id: number): Observable<User> {
    return this.http.get(url +  '/' + id).pipe(map((data:any) => {
      return new User(data);
    }))
  }

  delete(user: User): Observable<User> {
    return this.http.delete(url + '/' + user._id).pipe(map((data:any) => {
      return new User(data);
    }))
  }

  getPets () : Observable<Pet[]> {
    return this.http.get('http://localhost:3000/api/pets').pipe(map((data:any) => {
      return data.map((elem:any) => new Pet(elem))
    }))
  }

  getPet (id: number) : Observable<Pet> {
    return this.http.get('http://localhost:3000/api/pets/' + id).pipe(map((data:any) => {
      return new Pet(data);
    }))
  }

  add(pet: Pet) : Observable<any> {
    return this.http.post('http://localhost:3000/api/pets', pet)
  }

  update(pet: Pet): Observable<any> {
    return this.http.put('http://localhost:3000/api/pets/' + pet._id, pet);
  }

  getSlideShow(): Observable<SlideShow[]> {
    return this.http.get('http://localhost:3000/api/slideshow').pipe(
      map((data: any) => {
        return data && data.map((elem: any) => new SlideShow(elem) || []);
      })
    );
  }
}
