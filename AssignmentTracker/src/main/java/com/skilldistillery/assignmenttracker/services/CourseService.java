package com.skilldistillery.assignmenttracker.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.assignmenttracker.entities.Course;

public interface CourseService {

	List<Course> allCourses();
	Course findById(int courseId);
	Course createCourse(Course course);
	Course updateCourse(Course course);
	boolean deleteCourse(int courseId);
	List<Course> sortByCompletion(boolean isComplete);
}
