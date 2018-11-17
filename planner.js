$('#semesterdropdown').dropdown();

var semestertoclasses = new Map();

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
	addnewoption(dropdown1, "CS 2800")
	addnewoption(dropdown1, "MATH 2940")
	addnewoption(dropdown1, "CS 3110")
	addnewoption(dropdown1, "CS 4780")
	new_course.appendChild(dropdown1)

	var new_requirement = document.createElement("td")
	var dropdown2 = document.createElement("select")
	dropdown2.className = "ui search selection dropdown"
	dropdown2.id = "requirement-select" + (num_classes+1)
	addnewoption(dropdown2, "Requirement")
	addnewoption(dropdown2, "Core Class")
	addnewoption(dropdown2, "Major Course")
	addnewoption(dropdown2, "Major Elective")
	addnewoption(dropdown2, "External Specialization")
	addnewoption(dropdown2, "Technical Elective")
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
	var semester = document.getElementById("semesterdropdown").value
	
	var courses = table_body.children

	var classtorequirement = new Map();

	for (var i = 0; i < courses.length; i++){
		var data = courses[i].children
		classtorequirement.set(data[0].firstChild.children[3].innerHTML, 
								data[1].firstChild.children[3].innerHTML)
	}

	semestertoclasses.set(semester, classtorequirement)
	
}

function retrieveclasses(semester){
	classes = semestertoclasses.get(semester)

	var table_body = document.getElementById("table of classes").children[1]
	while(table_body.firstChild){
		table_body.removeChild(table_body.firstChild)
	}

	console.log(classes)
	if(classes != undefined ){
		var count = 1
		for(var key of Array.from(classes.keys())){
			addclass()
			var course = document.getElementById("course-select" + (count.toString()))
			course.value = key
			course.options[course.options.selectedIndex].innerHTML = key
			course.options[course.options.selectedIndex].selected = true
			var requirement = document.getElementById("requirement-select" + (count.toString()))
			requirement.value = classes.get(key)
			requirement.options[requirement.options.selectedIndex].innerHTML = classes.get(key)
			requirement.options[requirement.options.selectedIndex].selected = true
			count++
		}
	}

	//console.log(document.getElementById("course-select1").options[document.getElementById("course-select1").options.selectedIndex].innerHTML)

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
	//semesterlist.value = updatedsemester
	//retrieveclasses(updatedsemester)
}

