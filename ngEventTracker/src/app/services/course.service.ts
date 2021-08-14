import { HttpClient } from '@angular/common/http';
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
}
