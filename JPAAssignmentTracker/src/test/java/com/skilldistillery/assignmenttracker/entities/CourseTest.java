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

class CourseTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Course course;

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
		course = em.find(Course.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.clear();
		course = null;
	}

	@Test
	void test1() {
		assertNotNull(course); 
		assertEquals("Discrete Mathematics", course.getName());
	}

}
