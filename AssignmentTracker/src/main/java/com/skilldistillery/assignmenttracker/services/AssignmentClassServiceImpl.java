package com.skilldistillery.assignmenttracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.assignmenttracker.entities.AssignmentClass;
import com.skilldistillery.assignmenttracker.repositories.AssignmentClassRepository;

@Service
public class AssignmentClassServiceImpl implements AssignmentClassService{

	@Autowired
	private AssignmentClassRepository classRepo;
	
	@Override
	public List<AssignmentClass> allClasses() {
		return classRepo.findAll();
	}
}
