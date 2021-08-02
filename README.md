@# Event Tracker Project

### Full-Stack Spring/REST/JPA Project for Skill Distillery

## Overview
* TODO: description

## REST Endpoints

Markdown table of Endpoints here

| Return Type              | Route                                            | Functionality                               |
|--------------------------|--------------------------------------------------|---------------------------------------------|
| `List<Course>`           | `GET api/courses`                                | Get all courses                             |
| `Course`                 | `GET api/courses/{id}`                           | Get one course by id                        |
| `Course`                 | `POST api/courses`                               | Create a course                             |
| `Course`                 | `PUT api/courses`                                | Update a course                             |
| `Void`                   | `DELETE api/courses/`                            | Delete a course by id                       |
| `List<Course>`           | `GET api/courses/completion/{isComplete}`        | List courses by completion status           |
| `List<Assignment>`       | `GET api/assignments`                            | Get all assignments                         |
| `List<Assignment>`       | `GET api/courses/{id}/assignments`               | Get all assignments in a course             |
| `Assignment`             | `GET api/courses/{id}/assignments/{id}`          | Get one assignment from course by id        |
| `Assignment`             | `POST api/courses/{id}/assignments               | Create an assignment for a course           |
| `Assignment`             | `PUT api/courses/{id}/assignments/{id}`          | Update an assignment                        |
| `Void`                   | `DELETE api/courses/{id}/assignments/{id}`       | Delete an assignment for a course by id     |
| `List<Assignment>`       | `GET api/courses/{id}/assignments/{isComplete}`  | Get all completed assignments for a course  |
|---------------------------------------------------------------------------------------------------------------------------|
