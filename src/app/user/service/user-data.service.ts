import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { UserModel } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';

@Injectable()
export class UserDataService extends DefaultDataService<UserModel>{

  private apiUrl = `http://localhost:3000/users`
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('User', http, httpUrlGenerator);
  }

  override getAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl).pipe(
      map((res:any) => {
        console.log('res', res)
        return res.data.users
      })
    )
  }

  override getById(id: number): Observable<UserModel> {
    console.log('inside getById')
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<UserModel>(url)
      .pipe(
        // catchError(this.handleError)
        map((res:any) => {
          console.log('res', res)
          return res.data.user
        })
      );
  }

  override add(data: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, data).pipe(
      map((res:any) => {
        return res.data.user
      })
    )
  }

  override delete(id: any): Observable<string | number> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        map((res:any) => {
          return res.data.user
        })
      );
  }

  override update(data: any): Observable<any> {
    try {
    const inData = {
      first_name: data.changes.first_name,
      last_name: data.changes.last_name,
      email: data.changes.email,
      password: data.changes.password
    }
    const url = `${this.apiUrl}/${data.id}`
    return this.http.patch<UserModel>(url, inData).pipe(
      map((res: any) => {
        catchError(ex => {
          throw ex
        } )
        return res.data.user;
      })
    )
    } catch(ex) {
      return of(ex)
    }
  }
}
