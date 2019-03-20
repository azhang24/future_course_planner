import React from "react"
import {Dropdown} from "semantic-ui-react"
import DropdownField from "./DropdownField"

class CourseRow extends React.Component{
    constructor(){
        super()
        this.state = {
            subjects: [],
            classes: [],
            requirements: [],
            credits: null,
            chosenClass:
            {
                chosenSubject: "",
                chosenClass: "",
                chosenRequirement: "",
                chosenCredits: null
            }
        }
        this.handleSubjectChange = this.handleSubjectChange.bind(this)
        this.handleCourseChange = this.handleCourseChange.bind(this)
        this.handleRemoveRow = this.handleRemoveRow.bind(this)
    }
    
    componentDidMount(){
        const semester = this.props.chosenSemester
        let url
        if(semester.split(" ")[0] === "Fall"){
            url = "https://classes.cornell.edu/api/2.0/config/subjects.json?roster=FA18"
        }
        else{
            url = "https://classes.cornell.edu/api/2.0/config/subjects.json?roster=SP19"
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                var subjects_array = data.data.subjects
                var subject_objects = subjects_array.map((subject) => {
                    return {key: subject.value, 
                            value: subject.value,
                            text: "(" + subject.value + ") " + subject.descr}
                })
                this.setState({
                    subjects: subject_objects,
                    classes: [],
                    requirements: [],
                    credits: null,
                    chosenClass:
                    {
                        chosenSubject: "",
                        chosenClass: "",
                        chosenRequirement: "",
                        chosenCredits: null
                    }
                })
            })
    }

    handleSubjectChange(subject){
        const semester = this.props.chosenSemester
        let url
        if(semester.split(" ")[0] === "Fall"){
            url = "https://classes.cornell.edu/api/2.0/search/classes.json?roster=FA18&subject=" + subject
        }
        else{
            url = "https://classes.cornell.edu/api/2.0/search/classes.json?roster=SP19&subject=" + subject
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const classes = data.data.classes
                let class_objects = classes.map(clss => {
                    const classid = clss.subject + " " + clss.catalogNbr
                    const classtitle = clss.titleShort
                    const classfull = classid + " (" + classtitle + ")"
                    const creds = clss.enrollGroups[0].unitsMaximum
                    return {
                        key: classid,
                        value: classtitle,
                        text: classfull,
                        credits: creds
                    }
                })
                this.setState(prevState => {
                    return {
                        subjects: prevState.subjects,
                        classes: class_objects,
                        requirements: [],
                        credits: null,
                        chosenClass:
                        {
                            chosenSubject: subject,
                            chosenClass: "",
                            chosenRequirement: "",
                            chosenCredits: null
                        }
                    }
                })
            })
    }

    handleCourseChange(course){
        this.setState(prevState => {
            return {
                subjects: prevState.subjects,
                classes: prevState.classes,
                requirements: prevState.requirements,
                credits: null,
                chosenClass: prevState.chosenClass
            }
        })
        const classes = this.state.classes
        const creds = classes.filter(clss => clss.value === course)[0].credits
        this.setState(prevState => {
            return {
                subjects: prevState.subjects,
                classes: prevState.classes,
                requirements: prevState.requirements,
                credits: creds,
                chosenClass: {
                    chosenSubject: prevState.chosenClass.chosenSubject,
                    chosenClass: course,
                    chosenRequirement: prevState.chosenClass.chosenRequirement,
                    chosenCredits: creds
                }
            }
        })
    }

    handleRemoveRow(){
        this.props.onRemove(this.props.id)
    }

    render(){
        return (<tr>
            <td>
                <DropdownField
                    options={this.state.subjects}
                    placeholder="Subject"
                    name="subject"
                    onChange={this.handleSubjectChange}
                />

            </td>
            <td>
                <DropdownField
                    options={this.state.classes}
                    placeholder="Course"
                    name="course"
                    onChange={this.handleCourseChange}
                />
            </td>
            <td>
                <Dropdown 
                    search
                    selection
                    placeholder="Requirement"
                    options={this.state.requirements}
                />
            </td>
            <td>{this.state.credits}</td>
            <td>
                <button 
                    className="negative ui button"
                    onClick={this.handleRemoveRow}
                    >
                    Remove Course
                </button>
            </td>
        </tr>)
    }
}

export default CourseRow