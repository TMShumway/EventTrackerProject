package com.skilldistillery.assignmenttracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.assignmenttracker.entities.Course;
import com.skilldistillery.assignmenttracker.services.CourseService;

@CrossOrigin({"*", "http://localhost:4210"})
@RequestMapping("api")
@RestController
public class CourseController {

	@Autowired
	private CourseService courseService;
	
	@GetMapping("courses")
	public List<Course> listCourses(){
		return courseService.allCourses();
	}
	
	@GetMapping("courses/completion/{isComplete}")
	public List<Course> listCoursesByCompletion(@PathVariable boolean isComplete){
		return courseService.sortByCompletion(isComplete);
	}
	
	@GetMapping("courses/{courseId}")
	public Course getCourseById(@PathVariable int courseId, HttpServletResponse res){
		Course course = courseService.findById(courseId);
		if(course == null) {
			res.setStatus(404);
		} else {
			res.setStatus(201);
		}
		return course;
	}
	
	@PostMapping("courses")
	public Course createCourse(@RequestBody Course course, HttpServletResponse res,
			                                               HttpServletRequest req) {
		try {
			course = courseService.createCourse(course);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(course.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			res.setStatus(400);
			course = null;
		}	
		return course;
	}
	
	@PutMapping("courses")
	public Course updateCourse(@RequestBody Course course,
			                       HttpServletResponse res) {
		Course newCourse = null;
		try {
			newCourse = courseService.updateCourse(course);
			if(newCourse == null) {
				res.setStatus(404);
			}
			res.setStatus(201);
		} catch (Exception e) {
			res.setStatus(400);
			newCourse = null;
		}
		return newCourse;
	}
	
	@DeleteMapping("courses/{courseId}")
	public void deleteCourseById(@PathVariable int courseId, HttpServletResponse res) {
		try {
			boolean wasDeleted = courseService.deleteCourse(courseId);
			if(wasDeleted) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
		}
	}

}
