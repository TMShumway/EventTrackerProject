package com.skilldistillery.assignmenttracker.services;

import java.util.List;

import com.skilldistillery.assignmenttracker.entities.Assignment;
import com.skilldistillery.assignmenttracker.entities.Course;

public interface AssignmentService {

	List<Assignment> allAssignments();
	public List<Assignment> findByCourseId(int courseId);
	Assignment findByCourseIdAndAssignmentId(int courseId, int assignmentId);
	Assignment createAssignmentByCourseId(int courseId, Assignment assignment);
	Assignment updateAssignment(Assignment assignment);
	boolean deleteAssignment(int courseId, int assignmentId);
	List<Assignment> sortByCompletionAndCourseId(boolean isComplete, int courseId);

}
