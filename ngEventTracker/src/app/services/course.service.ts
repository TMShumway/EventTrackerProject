import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl = 'http://localhost:8084/';
  url = this.baseUrl + 'api/courses';

  constructor(private http: HttpClient) { }

  index(): Observable<Course[]>{
    return this.http.get<Course[]>(this.url).pipe(
      catchError((err: any) => {
        console.error('CourseService.index(): error retrieving courses.');
        return throwError(err);
      })
    );
  }

  public create(course: Course){

    return this.http.post<Course>(this.url, course, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error creating course: ' + err);
        })
      );
  }

  public destroy(id: number){
    return this.http.delete<Course>(this.url + "/" + id, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error deleting course: ' + err);
        })
      );
  }

  public update(course: Course){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Course>(this.url, course, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error updating course: ' + err)
        })
      );
  }

  getHttpOptions(){
    // const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        // 'Authorization': `Basic ${credentials}`
      })
    };
  return httpOptions;
  }
}
