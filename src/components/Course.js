import React from "react"
import {Dropdown} from "semantic-ui-react"
import Subject from "./course_components/Subject"

class Course extends React.Component{
    constructor(){
        super()
        this.state = {
            subjects: [],
            classes: [],
            requirements: [],
            credits: null,
        }
        this.handleSubjectChange = this.handleSubjectChange.bind(this)
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
            .then(data => console.log(data.data.classes))
    }

    render(){
        return (<tr>
            <td>
                <Subject
                    subjects={this.state.subjects} 
                    onSubjectChange={this.handleSubjectChange}
                />

            </td>
            <td><Dropdown 
                    search
                    selection
                    placeholder="Course"
                    options={this.state.classes}
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

export default Course