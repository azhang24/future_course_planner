var transferpolicy = 'http://courses.cornell.edu/content.php?catoid=31&navoid=7931';
var request = new XMLHttpRequest();
request.open('GET', transferpolicy);
request.send();
if(request.status == 200)
	dump(request.responseText);



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

	var new_subject = document.createElement("td")
	var dropdown0 = document.createElement("select")
	dropdown0.className = "ui search selection dropdown"
	dropdown0.id = "subject-select" + (num_classes+1)
	addnewoption(dropdown0, "Transfer Subject")
	new_subject.appendChild(dropdown0) 
	
	var new_course = document.createElement("td")
	var dropdown1 = document.createElement("select")
	dropdown1.className = "ui search selection dropdown"
	dropdown1.id = "placement-select" + (num_classes+1)
	addnewoption(dropdown1, "Course Name")
	new_course.appendChild(dropdown1)

	new_row.appendChild(new_subject)
	new_row.appendChild(new_course)

	table_body.appendChild(new_row)

	$('#'+dropdown0.id).dropdown()
	$('#'+dropdown1.id).dropdown()
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



