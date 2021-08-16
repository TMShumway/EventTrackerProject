import { Course } from "./course";

export class Assignment {

  id: number;
  name: string;
  dueDate: string;
  details: string;
  isComplete: boolean;
  course: Course;

  constructor(
    id: number = 0,
    name: string = '',
    dueDate: string = '',
    details: string = '',
    isComplete: boolean = false,
    course: Course = new Course()
  ){

  this.id = id;
  this.name = name;
  this.dueDate = dueDate;
  this.details = details;
  this.isComplete = isComplete;
  this.course = course;

  }

}
