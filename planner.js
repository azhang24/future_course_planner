$('#seasondropdown').dropdown();

var semestertoclasses = new Map();

function semesterabrev(season, year){
	var y = year % 1000;
	if(season == "Fall"){
		return "FA" + y.toString();
	}
	else if(season == "Spring"){
		return "SP" + y.toString();
	}
}

function addnewsubjects(dropdown, semester){
	var subjects = 'https://classes.cornell.edu/api/2.0/config/subjects.json?roster=' + semester;
	var request = new XMLHttpRequest();
	request.open('GET', subjects);
	request.responseType = 'json';
	request.send();
	request.onload = function(){
		var subjects = request.response.data.subjects;
		for(var i = 0; i < subjects.length; i++){
			var option = document.createElement("option");
			option.value = subjects[i].value;
			option.innerHTML = subjects[i].value + " (" + subjects[i].descr +")";
			dropdown.appendChild(option);
		}

	}

}

function addnewclasses(dropdown, classes){
	for(var i = 0; i < classes.length; i++){
		var option = document.createElement("option");
		option.value = classes[i].subject + " " + classes[i].catalogNbr;
		option.innerHTML = classes[i].subject + " " + classes[i].catalogNbr + " (" + classes[i].titleShort + ")";
		dropdown.appendChild(option);
	}
}

function removeoldclasses(dropdown){
	var length = dropdown.options.length;
	for(var i = length - 1; i > 0; i--){
		dropdown.remove(i);
	}
}

function addnewoption(dropdown, optionName){
	var option = document.createElement("option")
	option.value = optionName
	option.innerHTML = optionName
	dropdown.appendChild(option)
}

function addclass(){

	var season = document.getElementById("season").innerHTML
 	var year = document.getElementById("year").innerHTML

 	var abrev = semesterabrev(season, parseInt(year, 10))

	var table_body = document.getElementById("table of classes").children[1]
	var num_classes = table_body.childElementCount
	var new_row = document.createElement("tr")

	var new_subject = document.createElement("td")
	var dropdown0 = document.createElement("select")
	dropdown0.className = "ui search selection dropdown"
	dropdown0.id = "subject-select" + (num_classes+1)
	addnewoption(dropdown0, "Subject")
	addnewsubjects(dropdown0, abrev)
	new_subject.appendChild(dropdown0) 
	
	var new_course = document.createElement("td")
	var dropdown1 = document.createElement("select")
	dropdown1.className = "ui search selection dropdown"
	dropdown1.id = "course-select" + (num_classes+1)
	addnewoption(dropdown1, "Course")
	//addnewclasses(dropdown1, request.response.data.classes)
	new_course.appendChild(dropdown1)

	dropdown0.onchange = function () 
	{
		var subject = dropdown0.value;
		var classes = 'https://classes.cornell.edu/api/2.0/search/classes.json?roster='+ abrev + '&subject=' + subject;
		var request = new XMLHttpRequest();
		request.open('GET', classes);
		request.responseType = 'json';
		request.send();
		request.onload = function(){
			var data = request.response;
			removeoldclasses(dropdown1);
			addnewclasses(dropdown1, data.data.classes);
		}
	};

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
	addnewoption(dropdown2, "Liberal Studies")
	new_requirement.appendChild(dropdown2)

	var new_credits = document.createElement("td")
	dropdown1.onchange = function () 
	{
		var class_ = dropdown1.value;
		var subject = class_.split(' ')[0];
		var num = class_.split(' ')[1];
		var classes = 'https://classes.cornell.edu/api/2.0/search/classes.json?roster='+ abrev + '&subject=' + subject;
		var request = new XMLHttpRequest();
		request.open('GET', classes);
		request.responseType = 'json';
		request.send();
		request.onload = function(){
			var classes = request.response.data.classes;
			for(var id = 0; id < classes.length; id++){
				if(classes[id].catalogNbr == num){
					var num_credits = classes[id].enrollGroups[0].unitsMaximum;
					break;
				}
			}
			new_credits.value = num_credits;
			new_credits.innerHTML = num_credits;
		}
	};

	var remove = document.createElement("td")
	var remove_button = document.createElement("button");
	remove_button.innerHTML = "Remove"
	remove_button.className = "negative ui button";
	remove.appendChild(remove_button);
	remove_button.onclick = function(){
		console.log(table_body.childElementCount);
		var row_to_remove = remove_button.parentElement.parentElement;
		table_body.removeChild(row_to_remove);
		console.log(table_body.childElementCount);
		for (var i = 0; i < table_body.childElementCount; i++){
			table_body.children[i].children[0].children[0].children[0].id = "subject-select" + (i+1);
			table_body.children[i].children[1].children[0].children[0].id = "course-select" + (i+1);
			table_body.children[i].children[2].children[0].children[0].id = "requirement-select" + (i+1);
		}

	}

	new_row.appendChild(new_subject)
	new_row.appendChild(new_course)
	new_row.appendChild(new_requirement)
	new_row.appendChild(new_credits)
	new_row.appendChild(remove);

	table_body.appendChild(new_row)


	$('#'+dropdown0.id).dropdown()
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

function goprevsemester(){
 	var season = document.getElementById("season").innerHTML
 	var year = document.getElementById("year").innerHTML
 	if(season == "Fall"){
		document.getElementById("season").innerHTML = "Spring"
	}
	else{
		var py = parseInt(year, 10)
		py -= 1
		prevyear = py.toString()
		document.getElementById("season").innerHTML = "Fall"
		document.getElementById("year").innerHTML = prevyear
	}
}
 function gonextsemester(){
	var season = document.getElementById("season").innerHTML
 	var year = document.getElementById("year").innerHTML
 	if(season == "Fall"){
		var ny = parseInt(year, 10)
		ny += 1
		nextyear = ny.toString()
		document.getElementById("season").innerHTML = "Spring" 
		document.getElementById("year").innerHTML = nextyear
	}
	else{
		document.getElementById("season").innerText = "Fall"
	}
}
