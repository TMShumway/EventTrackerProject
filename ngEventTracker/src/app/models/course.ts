import { Assignment } from "./assignment";

export class Course {

  id: number;
  name: string;
  isComplete: boolean;
  startDate: string | null;
  endDate: string | null;
  courseCode: string;
  assignments?: Assignment[] | null;

  constructor(
    id: number = 0,
    name: string = '',
    isComplete: boolean = false,
    startDate: string = '',
    endDate: string = '',
    courseCode: string = '',
    assignments: Assignment[] = null
  ){
    this.id = id;
    this.name = name;
    this.isComplete = isComplete;
    this.startDate = startDate;
    this.endDate = endDate;
    this.courseCode = courseCode;
    this.assignments = assignments;
  }
}
