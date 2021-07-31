package com.skilldistillery.assignmenttracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.assignmenttracker.entities.AssignmentClass;

public interface AssignmentClassRepository extends JpaRepository<AssignmentClass, Integer> {

}
