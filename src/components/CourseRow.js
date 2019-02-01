import React from "react"
import {Dropdown} from "semantic-ui-react"
import Subject from "./course_components/Subject"
import Course from "./course_components/Course"

class CourseRow extends React.Component{
    constructor(){
        super()
        this.state = {
            subjects: [],
            classes: [],
            requirements: [],
            credits: null,
        }
        this.handleSubjectChange = this.handleSubjectChange.bind(this)
        this.handleCourseChange = this.handleCourseChange.bind(this)
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
                    credits: null
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
                        requirements: prevState.requirements,
                        credits: prevState.credits
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
                credits: null
            }
        })
        const classes = this.state.classes
        const creds = classes.filter(clss => clss.value === course)[0].credits
        this.setState(prevState => {
            return {
                subjects: prevState.subjects,
                classes: prevState.classes,
                requirements: prevState.requirements,
                credits: creds
            }
        })
    }

    render(){
        return (<tr>
            <td>
                <Subject
                    subjects={this.state.subjects} 
                    onSubjectChange={this.handleSubjectChange}
                />

            </td>
            <td><Course
                    courses={this.state.classes}
                    onCourseChange={this.handleCourseChange}
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
            <td><button className="negative ui button">Remove Course</button></td>
        </tr>)
    }
}

export default CourseRow