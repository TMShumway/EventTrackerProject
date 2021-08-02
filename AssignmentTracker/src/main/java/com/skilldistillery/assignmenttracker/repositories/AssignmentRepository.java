package com.skilldistillery.assignmenttracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.assignmenttracker.entities.Assignment;
import com.skilldistillery.assignmenttracker.entities.Course;

public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {

	List<Assignment> findByCourse_Id(int courseId);
//	
//	@Query(value = "SELECT * FROM assignment WHERE course_id = :cid AND id = :aid", nativeQuery = true)
//	Assignment findByCourseIdAndAssignmentId(@Param("cid")int courseId, @Param("aid")int assignmentId);
	
	List<Assignment> findByIsCompleteAndCourse_Id(boolean isComplete, int courseId);
	
	Assignment findByIdAndCourse_id(int assignmentId, int courseId);
}
