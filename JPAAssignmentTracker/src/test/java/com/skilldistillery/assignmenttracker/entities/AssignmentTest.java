package com.skilldistillery.assignmenttracker.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AssignmentTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Assignment assignment;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAAssignmentTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		assignment = em.find(Assignment.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.clear();
		assignment = null;
	}

	@Test
	void test1() {
		assertNotNull(assignment); 
		assertEquals("Chapter 1 End-of-Chapter Exercises", assignment.getName());
	}

}
