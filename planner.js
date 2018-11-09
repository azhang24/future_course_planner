/**$('#course-select1').dropdown();
$('#requirement-select1').dropdown();
$('#course-select2').dropdown();
$('#requirement-select2').dropdown();
$('#course-select3').dropdown();
$('#requirement-select3').dropdown();
$('#course-select4').dropdown();
$('#requirement-select4').dropdown();**/

$('#semesterdropdown').dropdown();

function addnewoption(dropdown, optionName){
	var option = document.createElement("option")
	option.value = optionName
	option.innerHTML = optionName
	dropdown.appendChild(option)
}

function addclass(){

	var table_body = document.getElementById("table of classes").children[1]
	var num_classes = table_body.childElementCount
	var new_row = document.createElement("tr")
	
	var new_course = document.createElement("td")
	var dropdown1 = document.createElement("select")
	dropdown1.className = "ui search selection dropdown"
	dropdown1.id = "course-select" + (num_classes+1)
	addnewoption(dropdown1, "Course")
	addnewoption(dropdown1, "CS 2110")
	new_course.appendChild(dropdown1)

	var new_requirement = document.createElement("td")
	var dropdown2 = document.createElement("select")
	dropdown2.className = "ui search selection dropdown"
	dropdown2.id = "requirement-select" + (num_classes+1)
	addnewoption(dropdown2, "Requirement")
	addnewoption(dropdown2, "Core Class")
	addnewoption(dropdown2, "Major Course")
	addnewoption(dropdown2, "External Specialization")
	addnewoption(dropdown2, "Major Technical Elective")
	addnewoption(dropdown2, "Advisor-Approved Elective")
	new_requirement.appendChild(dropdown2)

	new_row.appendChild(new_course)
	new_row.appendChild(new_requirement)

	table_body.appendChild(new_row)

	$('#'+dropdown1.id).dropdown()
	$('#'+dropdown2.id).dropdown()
}

function removeclass(){
	var table_body = document.getElementById("table of classes").children[1]

	if (table_body.childElementCount > 0){
	
		var class_to_remove = table_body.children[table_body.childElementCount - 1]

		table_body.removeChild(class_to_remove)
	}

}

function saveclasses(){
	var table_body = document.getElementById("table of classes").children[1]
	var num_classes = table_body.childElementCount
	var semester = document.getElementById("current_semester").innerText

	


	
}

function updatesemesterlist(){
	var semesterlist = document.getElementById("semesterdropdown")
	var updatedsemester = semesterlist.value
	while(semesterlist.firstChild){
		semesterlist.removeChild(semesterlist.firstChild)
	}

	semesterparts = updatedsemester.split(" ")
	var season = semesterparts[0]
	var year = semesterparts[1]

	if (season == "Fall"){
		var ny = parseInt(year, 10)
		ny += 1
		nextyear = ny.toString()

		var py = parseInt(year, 10)
		py -= 1
		prevyear = py.toString()

		addnewoption(semesterlist, "Fall" + " " + nextyear)
		addnewoption(semesterlist, "Spring" + " " + nextyear)
		addnewoption(semesterlist, updatedsemester)
		addnewoption(semesterlist, "Spring" + " " + year)
		addnewoption(semesterlist, "Fall" + " " + prevyear)
	}
	else{

		var ny = parseInt(year, 10)
		ny += 1
		nextyear = ny.toString()

		var py = parseInt(year, 10)
		py -= 1
		prevyear = py.toString()

		addnewoption(semesterlist, "Spring" + " " + nextyear) 
		addnewoption(semesterlist, "Fall" + " " + year)
		addnewoption(semesterlist, updatedsemester)
		addnewoption(semesterlist, "Fall" + " " + prevyear)
		addnewoption(semesterlist, "Spring" + " " + prevyear)
	}
	semesterlist.value = updatedsemester
}

