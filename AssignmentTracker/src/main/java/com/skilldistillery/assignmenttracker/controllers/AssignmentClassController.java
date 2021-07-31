package com.skilldistillery.assignmenttracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.assignmenttracker.entities.AssignmentClass;
import com.skilldistillery.assignmenttracker.services.AssignmentClassService;

@RequestMapping("api")
@RestController
public class AssignmentClassController {

	@Autowired
	private AssignmentClassService service;
	
	@GetMapping("classes")
	public List<AssignmentClass> listClasses(){
		return service.allClasses();
	}
}
