package com.skilldistillery.assignmenttracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.assignmenttracker.entities.Assignment;
import com.skilldistillery.assignmenttracker.services.AssignmentService;

@RequestMapping("api")
@RestController
public class AssignmentController {

	@Autowired
	private AssignmentService assignmentService;
	
	@GetMapping("assignments")
	public List<Assignment> listCourses(){
		return assignmentService.allAssignments();
	}
	
	@GetMapping("courses/{courseId}/assignments")
	public List<Assignment> listAssignmentsByCourseId(@PathVariable int courseId, HttpServletResponse res){
		List<Assignment> assignments = assignmentService.findByCourseId(courseId);
		if(assignments.size() > 0) {
			res.setStatus(200);
		} else {
			res.setStatus(404);
		}
		return assignments;
	}
	
	@GetMapping("courses/{courseId}/assignments/completion/{isComplete}")
	public List<Assignment> listAssignmentsByCourseByCompletion(@PathVariable int courseId,
			                                                    @PathVariable boolean isComplete){
		return assignmentService.sortByCompletionAndCourseId(isComplete, courseId);
	}
	
	@GetMapping("courses/{courseId}/assignments/{assignmentId}")
	public Assignment getAssignmentByIdAndCourseId(@PathVariable int courseId, 
			                                       @PathVariable int assignmentId,
			                                       HttpServletResponse res) {
		Assignment assignment = assignmentService.findByCourseIdAndAssignmentId(courseId, assignmentId);
		if(assignment == null) {
			res.setStatus(404);
		}
		return assignment;
	}
	
	@PostMapping("courses/{courseId}/assignments")
	public Assignment createAssignmentForCourse(@PathVariable int courseId, @RequestBody Assignment assignment,
			                         HttpServletResponse res, HttpServletRequest req) {
		try {
			assignment = assignmentService.createAssignmentByCourseId(courseId, assignment);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(assignment.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			res.setStatus(400);
			assignment = null;
		}
		return assignment;
	}
	
	@PutMapping("courses/{courseId}/assignments")
	public Assignment updateAssignment(@RequestBody Assignment assignment, HttpServletResponse res) {
		Assignment newAssignment = null;
		try {
			newAssignment = assignmentService.updateAssignment(assignment);
			if(newAssignment == null) {
				res.setStatus(404);
			}
			res.setStatus(201);
		} catch (Exception e) {
			res.setStatus(400);
			newAssignment = null;
		}
		return newAssignment;
	}
	
	@DeleteMapping("courses/{courseId}/assignments/{assignmentId}")
	public void deleteAssignment(@PathVariable int courseId,
			                     @PathVariable int assignmentId, HttpServletResponse res) {
		try {
			boolean wasDeleted = assignmentService.deleteAssignment(courseId, assignmentId);
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
