import React from "react"
import {Dropdown} from "semantic-ui-react"

class Course extends React.Component{
    constructor(){
        super()
        this.state = {
            value: ""
        }
        this.handleCourseChange = this.handleCourseChange.bind(this)
    }

    handleCourseChange(event, data){
        const course = data.value
        this.setState({
            value: course
        })
        this.props.onCourseChange(course)
    }
    
    render(){
        return (
            <Dropdown
                search
                selection
                placeholder="Course Name (i.e. CS 2110)"
                options={this.props.courses}
                onChange={this.handleCourseChange}
            />
        )
    }
}

export default Course