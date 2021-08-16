import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Assignment } from '../models/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  // baseUrl = 'http://localhost:8084/';
  url = environment.baseUrl + 'api/courses/';

  constructor(private http: HttpClient) { }

  index(id: number): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(this.url + id + "/assignments").pipe(
      catchError((err: any) => {
        console.error('AssignmentService.index(): error retrieving assignments.');
        return throwError(err);
      })
    );
  }

  public create(assignment: Assignment, id: number){

    return this.http.post<Assignment>(this.url + id + "/assignments", assignment, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error creating assignment: ' + err);
        })
      );
  }

  public update(assignment: Assignment, id: number){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Assignment>(this.url + id + "/assignments", assignment, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error updating assignment: ' + err)
        })
      );
  }

  public destroy(aid: number, cid: number){
    return this.http.delete<Assignment>(this.url + "/" + cid + "/assignments/" + aid, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Error deleting course: ' + err);
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
