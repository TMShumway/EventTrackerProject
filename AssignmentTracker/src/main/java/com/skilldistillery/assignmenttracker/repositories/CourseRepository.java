package com.skilldistillery.assignmenttracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.assignmenttracker.entities.Course;

public interface CourseRepository extends JpaRepository<Course, Integer> {

	List<Course> findByIsComplete(boolean isComplete);
	
}
