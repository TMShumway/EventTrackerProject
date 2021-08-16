import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-assignmentlist',
  templateUrl: './assignmentlist.component.html',
  styleUrls: ['./assignmentlist.component.css']
})
export class AssignmentlistComponent implements OnInit {

  courseName: string = 'Loading...';
  currentCourseId: number = 0;

  editAssignment:  Assignment = new Assignment();
  newAssignment: Assignment = new Assignment();

  assignments: Assignment[] = [];

  editAssignmentView: boolean = false;
  newAssignmentView: boolean = false;

  constructor(private assignmentService: AssignmentService, private currentRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    let courseId = this.currentRoute.snapshot.paramMap.get("id");
    let cName = this.currentRoute.snapshot.paramMap.get("name");
    this.currentCourseId = +courseId;
    this.courseName = cName;
    this.loadAssignments(this.currentCourseId);
  }

  loadAssignments(id: number){
    this.assignmentService.index(id).subscribe(
      assignments => {
        this.assignments = assignments; },

      noAssignments => {
        console.error('AssignmentListComponent.loadAssignments(): error retrieving assignment list.');
        console.error(noAssignments);
      }
    );
  }

  deleteCourse(id: number){
    this.assignmentService.destroy(id, this.currentCourseId).subscribe(
      data => {
        this.goHome();
        this.loadAssignments(this.currentCourseId); },

      err => { console.error('Observer error: ' + err) }
    );
  }

  viewEdit(a: Assignment){
    this.editAssignmentView = true;
    this.editAssignment = a;
  }

  addAssignment(id: number){
    this.assignmentService.create(this.newAssignment, id).subscribe(
      data => {
        this.goHome();
        this.loadAssignments(this.currentCourseId); },

      err => { console.error('Observer error: ' + err) }
    );
  }

  updateAssignment(){
    this.assignmentService.update(this.editAssignment, this.currentCourseId).subscribe(
      data => {
        this.goHome();
        this.loadAssignments(this.currentCourseId); },

      err => { console.error('Observer error: ' + err) }
    );
  }

  viewNew(){
    this.newAssignmentView = true;
  }

  goHome(){
    this.editAssignment = new Assignment();
    this.newAssignment = new Assignment();
    this.newAssignmentView = false;
    this.editAssignmentView = false;
  }
}
