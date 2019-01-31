import React from "react"
import {Dropdown} from "semantic-ui-react"

class SemesterDropdown extends React.Component{

    constructor(){
        super()
        this.state = {
            value: ""
        }
        this.handleSemesterChange = this.handleSemesterChange.bind(this)
    }

    handleSemesterChange(event, data){
        const semester = data.value
        this.setState({
            value: semester
        })
        this.props.onSemesterChange(semester)
    }

    render(){
        return (
            <Dropdown
                    options={this.props.options}
                    selection
                    value={this.state.value}
                    placeholder="Select Semester"
                    name="semester"
                    onChange={this.handleSemesterChange}
                />
        )
    }
}

export default SemesterDropdown