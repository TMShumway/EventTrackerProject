# Event Tracker Project

### Full-Stack Spring/REST/JPA Project for Skill Distillery

## Overview
This program is intended to serve as a RESTful API and allows for interaction with RESTful web services which in this case,
when finished, will be an event tracker for assignments for a college class, or any other kind of course. It is the first
of a multi-weekend project and is intended to fulfill the contract between the information provider (a MySQL database schema),
and the information user (the user via endpoints represented through a web front end).  

The second addition to this project incorporated a front end using JavaScript and HTML with CSS. This allows for the information
user to access the REST api endpoints via a GUI. All information is presented in a way to allow simple and intuitive navigation.

The third and final addition to this project replaced the JavaScript/HTML/CSS front end with a new front end running on the
Angular Framework. This necessitated a switch from JavaScript to TypeScript.

## Technologies Used

* Java
* Angular
* JavaScript
* TypeScript
* Asynchronous Http Requests
* Java Persistence API
* REST API
* Spring DATA JPA
* Gradle
* MySQL Workbench
* Postman
* JSON
* Tomcat
* Git and GitHub

### Specific Technology Implementations

* Used Angular Models, Components, and Services to build front end
* Asynchronous requests to Java Backend via XMLHttpRequests
* Dynamic construction of HTML elements to update front end in real-time
* POST, PUT, GET, and DELETE requests sent via XMLHttpRequests
* Parse JSON responses from Backend
* Construct JSON responses to send to backend
* Spring REST Annotations
* Spring DATA JPA to perform CRUD operations
  * Derived Queries
* Send and receiving JSON
* Object Relational Mapping
* Relational Database Design with Mysql Workbench
* Object-Oriented Programming in Java: Abstraction, Polymorphism, Inheritance, and Encapsulation.
* Testing using JUnit and Postman tests

## How to Run

You can access the RESTful endpoints to retrieve data from the MySQL database. Endpoints are in the following table:

## Endpoints

| Return Type              | Route                                                       | Functionality                               |
|--------------------------|-------------------------------------------------------------|---------------------------------------------|
| `List<Course>`           | `GET api/courses`                                           | Get all courses                             |
| `Course`                 | `GET api/courses/{id}`                                      | Get one course by id                        |
| `Course`                 | `POST api/courses`                                          | Create a course                             |
| `Course`                 | `PUT api/courses`                                           | Update a course                             |
| `Void`                   | `DELETE api/courses/`                                       | Delete a course by id                       |
| `List<Course>`           | `GET api/courses/completion/{isComplete}`                   | List courses by completion status           |
| `List<Assignment>`       | `GET api/assignments`                                       | Get all assignments                         |
| `List<Assignment>`       | `GET api/courses/{id}/assignments`                          | Get all assignments in a course             |
| `Assignment`             | `GET api/courses/{id}/assignments/{id}`                     | Get one assignment from course by id        |
| `Assignment`             | `POST api/courses/{id}/assignments`                         | Create an assignment for a course           |
| `Assignment`             | `PUT api/courses/{id}/assignments/{id}`                     | Update an assignment                        |
| `Void`                   | `DELETE api/courses/{id}/assignments/{id}`                  | Delete an assignment for a course by id     |
| `List<Assignment>`       | `GET api/courses/{id}/assignments/completion/{isComplete}`  | Get all completed assignments for a course  |

### Lessons Learned

This project was an introduction to RESTful services and design. It was also my first time using Spring Data JPA.
Using JPA I cemented storing, accessing, and mapping and managing Java Entities as they relate to tables in
a relational database. This concept of ORM, or Object Relational Mapping, was a foundation that I could then use to serve content
to an information user through the RESTful API I implemented.

With Spring Boot, I used Spring REST annotations. I also used Spring Data JPA to implement the JPA repository and perform
CRUD operations through built in CRUD methods and derived Queries. Data was pushed between endpoints and the information provider
using JSON. Additionally, as mentioned earlier, the backend was a MySql relational database schema.

### Relational DB Tables
<p>
<img src="tables.jpg" alt="DB Tables" align="center"/>
</p>
