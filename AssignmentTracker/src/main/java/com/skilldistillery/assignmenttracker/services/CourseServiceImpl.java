package com.skilldistillery.assignmenttracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.assignmenttracker.entities.Assignment;
import com.skilldistillery.assignmenttracker.entities.Course;
import com.skilldistillery.assignmenttracker.repositories.AssignmentRepository;
import com.skilldistillery.assignmenttracker.repositories.CourseRepository;

@Service
public class CourseServiceImpl implements CourseService{

	@Autowired
	private CourseRepository courseRepo;
	
	@Autowired
	private AssignmentRepository assignmentRepo;
	
	@Override
	public List<Course> allCourses() {
		return courseRepo.findAll();
	}

	@Override
	public Course findById(int courseId) {
		Optional<Course> courseOptional = courseRepo.findById(courseId);
		Course course = null;
		if(courseOptional.isPresent()) {
			course = courseOptional.get();
		}
		return course;
	}

	@Override
	public Course createCourse(Course course) {
		return courseRepo.saveAndFlush(course);
		
	}

	@Override
	public Course updateCourse(Course course) {
		Optional<Course> courseOptional = courseRepo.findById(course.getId());
		if(courseOptional.isPresent()) {
			Course managedCourse = courseOptional.get();
			managedCourse.setName(course.getName());
			managedCourse.setIsComplete(course.getIsComplete());
			managedCourse.setStartDate(course.getStartDate());
			managedCourse.setEndDate(course.getEndDate());
			managedCourse.setCourseCode(course.getCourseCode());
			return courseRepo.saveAndFlush(managedCourse);
		}
		return null;
	}

	@Override
	public boolean deleteCourse(int courseId) {
		boolean wasDeleted = false;
		
		if(courseRepo.existsById(courseId)) {
			Course course = findById(courseId);
			if(course.getAssignments() != null) {
				for(Assignment a : course.getAssignments()) {
					assignmentRepo.delete(a);
				}
			}
			courseRepo.deleteById(courseId);
			wasDeleted = true;
		}
		
		return wasDeleted;
	}

	@Override
	public List<Course> sortByCompletion(boolean isComplete) {
		return courseRepo.findByIsComplete(isComplete);
	}
}


