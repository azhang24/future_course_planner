/**$('#course-select1').dropdown();
$('#requirement-select1').dropdown();
$('#course-select2').dropdown();
$('#requirement-select2').dropdown();
$('#course-select3').dropdown();
$('#requirement-select3').dropdown();
$('#course-select4').dropdown();
$('#requirement-select4').dropdown();**/

function addclass(){
	/*var course_header = document.getElementsByTagName("th")[0]
	var requirement_header = document.getElementsByTagName("th")[1]*/

	var table_body = document.getElementById("table of classes").children[1]

	var num_classes = table_body.childElementCount

	var new_row = document.createElement("tr")

	var new_course = document.createElement("td")

	var dropdown1 = document.createElement("select")
	dropdown1.className = "ui search selection dropdown"
	dropdown1.id = "course-select" + (num_classes+1)
	

	var firstoption = document.createElement("option")
	firstoption.innerHTML = "Course"

	var firstoption2 = document.createElement("option")
	firstoption2.innerHTML = "CS 2110"

	dropdown1.appendChild(firstoption)
	dropdown1.appendChild(firstoption2)

	new_course.appendChild(dropdown1)


	var new_requirement = document.createElement("td")

	var dropdown2 = document.createElement("select")
	dropdown2.className = "ui search selection dropdown"
	dropdown2.id = "requirement-select" + (num_classes+1)

	var secondoption = document.createElement("option")
	secondoption.innerHTML = "Requirement"

	dropdown2.appendChild(secondoption)

	new_requirement.appendChild(dropdown2)

	new_row.appendChild(new_course)
	new_row.appendChild(new_requirement)

	console.log(new_row)

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

function saveclass(){
	
}

function goprevsemester(){
	var semester = document.getElementById("current_semester").innerText

	semesterparts = semester.split(" ")

	var season = semesterparts[0]

	var year = semesterparts[1]

	if(season == "Fall"){
		document.getElementById("current_semester").innerText = "Spring" + " " + year
	}
	else{
		var py = parseInt(year, 10)
		py -= 1
		console.log(py)
		prevyear = py.toString()
		document.getElementById("current_semester").innerText = "Fall" + " " + prevyear
	}
}

function gonextsemester(){
	var semester = document.getElementById("current_semester").innerText

	semesterparts = semester.split(" ")

	var season = semesterparts[0]

	var year = semesterparts[1]

	if(season == "Fall"){
		var ny = parseInt(year, 10)
		ny += 1
		nextyear = ny.toString()
		document.getElementById("current_semester").innerText = "Spring" + " " + nextyear
	}
	else{
		document.getElementById("current_semester").innerText = "Fall" + " " + year
	}
}
