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
public class AssignmentServiceImpl implements AssignmentService{

	@Autowired
	private AssignmentRepository assignmentRepo;
	
	@Autowired
	private CourseRepository courseRepository;

	@Override
	public List<Assignment> allAssignments() {
		return assignmentRepo.findAll();
	}

	@Override
	public List<Assignment> findByCourseId(int courseId) {
		return assignmentRepo.findByCourse_Id(courseId);
	}
	
	@Override
	public Assignment findByCourseIdAndAssignmentId(int courseId, int assignmentId) {
		Assignment assignment = null;
		try {
//			assignment = assignmentRepo.findByCourseIdAndAssignmentId(courseId, assignmentId);
			assignment = assignmentRepo.findByIdAndCourse_id(assignmentId, courseId);
		} catch (Exception e) {
			return null;
		}
		return assignment;
	}

	@Override
	public Assignment createAssignmentByCourseId(int courseId, Assignment assignment) {
		Optional<Course> courseOptional = courseRepository.findById(courseId);
		if(courseOptional.isPresent()) {
			Course course = courseOptional.get();
			assignment.setCourse(course);
			Assignment savedAssignment = assignmentRepo.saveAndFlush(assignment);
			return savedAssignment;
		}
		return null;
	}

	@Override
	public Assignment updateAssignment(Assignment assignment) {
		return assignmentRepo.saveAndFlush(assignment);
	}

	@Override
	public boolean deleteAssignment(int courseId, int assignmentId) {
		boolean wasDeleted = false;
		Optional<Assignment> assignmentO = assignmentRepo.findById(assignmentId);
		if(assignmentO.isPresent()) {
			Assignment assignment = assignmentO.get();
			if(assignment.getCourse().getId() == courseId) {
				assignmentRepo.deleteById(assignmentId);
				wasDeleted = true;
			}
		}
		return wasDeleted;
	}

	@Override
	public List<Assignment> sortByCompletionAndCourseId(boolean isComplete, int courseId) {
		return assignmentRepo.findByIsCompleteAndCourse_Id(isComplete, courseId);
	}
	
	
}
