import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

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
}
