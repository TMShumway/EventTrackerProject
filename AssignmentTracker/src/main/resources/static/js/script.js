window.addEventListener("load", function(e){
	console.log("script.js loaded");
	init();
});

function init(){
	loadCourses()

	let homeButton = document.getElementById("homeButton");
	homeButton.addEventListener("click", function(e){
		e.preventDefault();
		let allCoursesView = document.getElementById("allCoursesView");
		let singleCourseView = document.getElementById("singleCourseView");
		allCoursesView.classList.remove("d-none");
		singleCourseView.classList.add("d-none");
		loadCourses();
	});

	let courseFormU = document.getElementById("updateCourseForm");
	courseFormU.updateCourse.addEventListener("click", function(e){
		e.preventDefault();
		let course = courseFormU;
		let newCourse = {
			id: course.id.value,
			name: course.name.value,
			courseCode: course.courseCode.value,
			startDate: course.startDate.value,
			endDate: course.endDate.value,
			isComplete: course.isComplete.value
		};
		updateCourse(newCourse);
	});
	
	let assignmentFormU = document.getElementById("updateAssignmentForm");
	assignmentFormU.updateAssignment.addEventListener("click", function(e){
		e.preventDefault();
		let assignment = assignmentFormU;
		let newAssignment = {
			id: assignment.id.value,
			name: assignment.name.value,
			dueDate: assignment.dueDate.value,
			details: assignment.details.value,
			isComplete: assignment.isComplete.value,
			course: {
				id: assignment.courseId.value
			}
		};
		updateAssignment(assignment.courseId.value, newAssignment);
	});

	let courseFormC = document.getElementById("createCourseForm");
	courseFormC.createCourse.addEventListener('click', function(e){
		e.preventDefault();
		let course = courseFormC;
		let newCourse = {
			name: course.name.value,
			courseCode: course.courseCode.value,
			startDate: course.startDate.value,
			endDate: course.endDate.value,
			isComplete: course.isComplete.value
		};
		createCourse(newCourse);
	});
	
	let assignmentFormC = document.getElementById("createAssignmentForm");
	assignmentFormC.createAssignment.addEventListener('click', function(e){
		e.preventDefault();
		let assignment = assignmentFormC;
		let newAssignment = {
			id: assignment.id.value,
			name: assignment.name.value,
			dueDate: assignment.dueDate.value,
			details: assignment.details.value,
			isComplete: assignment.isComplete.value,
			course: {
				id: assignment.courseId.value
			}
		};
		createAssignment(assignment.courseId.value, newAssignment);
	});
}

function loadCourses(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "api/courses");
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				let courses = JSON.parse(xhr.responseText);
				displayCourses(courses);
			} else {
				let courseListDiv = document.getElementById("courseListDiv");
				courseListDiv.innerHTML = "";
				let cardDiv = document.createElement("div");
				cardDiv.setAttribute("class", "card");
				let cardBodyDiv = document.createElement("div");
				cardBodyDiv.setAttribute("class", "card-body");
				courseListDiv.appendChild(cardDiv);
				cardDiv.appendChild(cardBodyDiv);
				let header1 = document.createElement("h1");
				header1.textContent = "No Courses or Assignments found.";
				cardBodyDiv.appendChild(header1);
			}
		}
	};
	xhr.send();
}

function displayCourses(courses){
	let courseListDiv = document.getElementById("courseListDiv");
	courseListDiv.innerHTML = "";
	if(courses && courses.length > 0){	
		for (const course of courses) {
			let cardDiv = document.createElement("div");
			cardDiv.setAttribute("class", "card");
			let cardBodyDiv = document.createElement("div");
			cardBodyDiv.setAttribute("class", "card-body");
			courseListDiv.appendChild(cardDiv);
			cardDiv.appendChild(cardBodyDiv);
			
			let table = document.createElement("table");
			let tr = document.createElement("tr");
			let td = document.createElement("td");
			td.textContent = `${course.courseCode}  ${course.name}` +
			` || Starting: ${course.startDate}  Ending: ${course.endDate}` +
			` || Complete: ${course.isComplete}`;
			
			td.addEventListener("click", updateC);
			function updateC(e){
				e.preventDefault();
				updateCourseEventL(course);
			}
			
			let assignmentsTable = buildAssignmentsTable(course.id, course.assignments);
			let deleteButton = buildDeleteCourseButton(course.id);
			td.appendChild(assignmentsTable);
			tr.appendChild(td);
			table.appendChild(tr);
			cardBodyDiv.appendChild(table);
			cardBodyDiv.appendChild(deleteButton);
		}
	} else {
		let cardDiv = document.createElement("div");
		cardDiv.setAttribute("class", "card");
		let cardBodyDiv = document.createElement("div");
		cardBodyDiv.setAttribute("class", "card-body");
		courseListDiv.appendChild(cardDiv);
		cardDiv.appendChild(cardBodyDiv);
		let header1 = document.createElement("h1");
		header1.textContent = "No Courses or Assignments found.";
		cardBodyDiv.appendChild(header1);
	}
}

function buildAssignmentsTable(courseId, assignments){
	if(assignments && assignments.length > 0){
		let assignmentsTable = document.createElement("table");
		assignmentsTable.setAttribute("class", "table table-bordered");
		let tableRow1 = document.createElement("tr");
		let thNumber1 = document.createElement("th");
		thNumber1.setAttribute("scope", "col");
		thNumber1.textContent = "Assignment#";
		let thName2 = document.createElement("th");
		thName2.setAttribute("scope", "col");
		thName2.textContent = "Name";
		let thDetails3 = document.createElement("th");
		thDetails3.setAttribute("scope", "col");
		thDetails3.textContent = "Details";
		let thDueDate4 = document.createElement("th");
		thDueDate4.setAttribute("scope", "col");
		thDueDate4.textContent = "Due Date";
		let thIsComplete5 = document.createElement("th");
		thIsComplete5.setAttribute("scope", "col");
		thIsComplete5.textContent = "Complete";
		
		assignmentsTable.appendChild(tableRow1);
		tableRow1.appendChild(thNumber1);
		tableRow1.appendChild(thName2);
		tableRow1.appendChild(thDetails3);
		tableRow1.appendChild(thDueDate4);
		tableRow1.appendChild(thIsComplete5);
		
		let counter = 1;
		for (const assignment of assignments) {
			let tableRowAssignments = document.createElement("tr");
			let tdNumber1 = document.createElement("td");
			tdNumber1.setAttribute("scope", "row");
			tdNumber1.textContent = counter++;
			let tdName2 = document.createElement("td");
			tdName2.setAttribute("scope", "col");
			tdName2.textContent = assignment.name;
			let tdDetails3 = document.createElement("td");
			tdDetails3.setAttribute("scope", "col");
			tdDetails3.textContent = assignment.details;
			let tdDueDate4 = document.createElement("td");
			tdDueDate4.setAttribute("scope", "col");
			tdDueDate4.textContent = assignment.dueDate;
			let tdIsComplete5 = document.createElement("td");
			tdIsComplete5.setAttribute("scope", "col");
			tdIsComplete5.textContent = assignment.isComplete;
			
			assignmentsTable.appendChild(tableRowAssignments);
			tableRowAssignments.appendChild(tdNumber1);
			tableRowAssignments.appendChild(tdName2);
			tableRowAssignments.appendChild(tdDetails3);
			tableRowAssignments.appendChild(tdDueDate4);
			tableRowAssignments.appendChild(tdIsComplete5);
		}
		assignmentsTable.addEventListener("click", function(e){
			let allCoursesView = document.getElementById("allCoursesView");
			let singleCourseView = document.getElementById("singleCourseView");
			allCoursesView.classList.add("d-none");
			singleCourseView.classList.remove("d-none");
			console.log("CI: " + courseId);
			loadAssignmentsByCourseId(courseId);
		});
		return assignmentsTable;
	} else {
		let header3 = document.createElement("h3");
		header3.textContent = "No assignments for this course found";
		header3.addEventListener("click", function(e){
			let allCoursesView = document.getElementById("allCoursesView");
			let singleCourseView = document.getElementById("singleCourseView");
			allCoursesView.classList.add("d-none");
			singleCourseView.classList.remove("d-none");
			loadAssignmentsByCourseId(courseId);
		});
		return header3;
	}
}

function createCourse(course) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/courses');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201 || xhr.status === 200) {
				// let newCourse = JSON.parse(xhr.responseText);
				let createCourseForm = document.getElementById("createCourseForm");
				createCourseForm.reset();
				loadCourses();
			} else {
				// displayError('Error creating film: ' + xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json"); 
	let courseJson = JSON.stringify(course);
	xhr.send(courseJson);
}

function createAssignment(courseId, assignment) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', `api/courses/${courseId}/assignments`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201 || xhr.status === 200) {
				// let newCourse = JSON.parse(xhr.responseText);
				let createAssignmentForm = document.getElementById("createAssignmentForm");
				createAssignmentForm.reset();
				loadAssignmentsByCourseId(courseId);
			} else {
				// displayError('Error creating film: ' + xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json"); 
	let assignmentJson = JSON.stringify(assignment);
	xhr.send(assignmentJson);
}

function updateCourse(course) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/courses');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201 || xhr.status === 200) {
				// let newCourse = JSON.parse(xhr.responseText);
				let createCourseForm = document.getElementById("updateCourseForm");
				updateCourseForm.reset();
				loadCourses();
			} else {
				// displayError('Error creating film: ' + xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json"); 
	let courseJson = JSON.stringify(course);
	xhr.send(courseJson);
}

function updateAssignment(courseId, assignment) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/courses/' + courseId + "/assignments");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201 || xhr.status === 200) {
				// let newCourse = JSON.parse(xhr.responseText);
				let updateAssignmentForm = document.getElementById("updateAssignmentForm");
				updateAssignmentForm.reset();
				loadAssignmentsByCourseId(courseId);
			} else {
				// displayError('Error creating film: ' + xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json"); 
	let assignmentJson = JSON.stringify(assignment);
	xhr.send(assignmentJson);
}

function updateCourseEventL(course){
	let updateCourseForm = document.getElementById("updateCourseForm");
	updateCourseForm.id.value = course.id;
	updateCourseForm.name.value = course.name;
	updateCourseForm.courseCode.value = course.courseCode;
	updateCourseForm.startDate.value = course.startDate;
	updateCourseForm.endDate.value = course.endDate;
	updateCourseForm.isComplete.value = course.isComplete;
}

function buildDeleteCourseButton(id){
	let deleteButton = document.createElement("button");
	deleteButton.setAttribute("name", "deleteCourse")
	deleteButton.value = id;
	deleteButton.textContent = "Delete Course";
	deleteButton.addEventListener("click", function(e){
		e.preventDefault();
		deleteCourse(deleteButton.value);
	});
	return deleteButton;
}

function deleteCourse(id){
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/courses/' + id);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204 || xhr.status === 200) {
				loadCourses();
			} else {
				// displayError('Error creating film: ' + xhr.status);
			}
		}
	};
	xhr.send();
}

function loadAssignmentsByCourseId(courseId){
	let courseIdHiddenInput = document.getElementsByName("courseId");
	for (const cid of courseIdHiddenInput) {
		cid.value = courseId;
	}

	let xhr = new XMLHttpRequest();
	xhr.open("GET", "api/courses/" + courseId + "/assignments");
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				let assignments = JSON.parse(xhr.responseText);
				console.log("LOAD ASSIGNMENTS: " + assignments);
				displayAssignments(courseId, assignments);
			} else {
				let assignmentListDiv = document.getElementById("assignmentListDiv");
				assignmentListDiv.innerHTML = "";
				let cardDiv = document.createElement("div");
				cardDiv.setAttribute("class", "card");
				let cardBodyDiv = document.createElement("div");
				cardBodyDiv.setAttribute("class", "card-body");
				courseListDiv.appendChild(cardDiv);
				cardDiv.appendChild(cardBodyDiv);
				let header1 = document.createElement("h1");
				header1.textContent = "No Assignments Found.";
				cardBodyDiv.appendChild(header1);
				assignmentListDiv.appendChild(cardDiv);
			}
		}
	};
	xhr.send();
}

function displayAssignments(courseId, assignments){
	console.log("DISPLAY ASSIGNMENTS" + assignments);
	let assignmentListDiv = document.getElementById("assignmentListDiv");
	assignmentListDiv.innerHTML = "";
	if(assignments || assignments.length > 0){	
		for (const assignment of assignments) {
			let cardDiv = document.createElement("div");
			cardDiv.setAttribute("class", "card");
			let cardBodyDiv = document.createElement("div");
			cardBodyDiv.setAttribute("class", "card-body");
			courseListDiv.appendChild(cardDiv);
			cardDiv.appendChild(cardBodyDiv);
			let p = document.createElement("p");
			p.textContent = `${assignment.name}` +
			` || Due: ${assignment.dueDate}  || Details: ${assignment.details}` +
			` || Complete: ${assignment.isComplete}`;
			
			p.addEventListener("click", updateA);
			function updateA(e){
				e.preventDefault();
				updateAssignmentEventL(courseId, assignment);
			}
			
			let deleteButton = buildDeleteAssignmentButton(courseId, assignment.id);
			cardBodyDiv.appendChild(p);
			cardBodyDiv.appendChild(deleteButton);
			assignmentListDiv.appendChild(cardDiv);
		}
	} else {
	}
}

function updateAssignmentEventL(courseId, assignment){
	console.log(assignment);
	let updateAssignmentForm = document.getElementById("updateAssignmentForm");
	updateAssignmentForm.id.value = assignment.id;
	updateAssignmentForm.name.value = assignment.name;
	updateAssignmentForm.details.value = assignment.details;
	aDetails = assignment.dueDate.slice(0, 16);
	updateAssignmentForm.dueDate.value = aDetails;
	updateAssignmentForm.isComplete.value = assignment.isComplete;

}

function buildDeleteAssignmentButton(courseId, assignmentId){
	let deleteButton = document.createElement("button");
	deleteButton.setAttribute("name", "deleteAssignment")
	deleteButton.value = id;
	deleteButton.textContent = "Delete Assignment";
	deleteButton.addEventListener("click", function(e){
		e.preventDefault();
		deleteAssignment(courseId, assignmentId);
	});
	return deleteButton;
}

function deleteAssignment(courseId, assignmentId){
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', "api/courses/" + courseId + "/assignments/" + assignmentId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204 || xhr.status === 200) {
				loadAssignmentsByCourseId(courseId);
			} else {
				// displayError('Error creating film: ' + xhr.status);
			}
		}
	};
	xhr.send();
}