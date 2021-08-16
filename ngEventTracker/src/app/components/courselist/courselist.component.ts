import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  courses: Course[] = [];

  newCourse: Course = new Course();
  newCourseView: boolean = false;

  editCourse: Course = new Course();
  editCourseView: boolean = false;

  constructor(private courseService: CourseService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(){
    this.courseService.index().subscribe(
      courses => { this.courses = courses; },

      noCourses => {
        console.error('CourseListComponent.loadCourses(): error retrieving course list.');
        console.error(noCourses);
      }
    );
  }

  addCourse(): void {
    this.courseService.create(this.newCourse).subscribe(
      data => {
        this.goHome();
        this.loadCourses(); },

      err => { console.error('Observer error: ' + err) }
    );
  }

  deleteCourse(id: number){
    this.courseService.destroy(id).subscribe(
      data => {
        this.goHome();
        this.loadCourses(); },

      err => { console.error('Observer error: ' + err) }
    );
  }

  updateCourse(){
    this.courseService.update(this.editCourse).subscribe(
      data => {
        this.goHome();
        this.loadCourses(); },

      err => { console.error('Observer error: ' + err) }
    );
  }

  viewEdit(course: Course){
    this.editCourse = {...course};
    this.editCourseView = true;
  }

  viewNew(){
    this.newCourseView = true;
  }

  goHome(){
    this.editCourse = new Course();
    this.newCourse = new Course();
    this.newCourseView = false;
    this.editCourseView = false;
  }

  routeToAssignments(id: number, name: string){
    this.router.navigateByUrl("courses/" + id + "/" + name + "/assignments");
  }

}
