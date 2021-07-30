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

class AssignmentClassTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private AssignmentClass assignmentClass;

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
		assignmentClass = em.find(AssignmentClass.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.clear();
		assignmentClass = null;
	}

	@Test
	void test1() {
		assertNotNull(assignmentClass); 
		assertEquals("Discrete Mathematics", assignmentClass.getName());
	}

}
