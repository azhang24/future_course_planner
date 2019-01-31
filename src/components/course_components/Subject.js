import React from "react"
import {Dropdown} from "semantic-ui-react"

class Subject extends React.Component{
    
    constructor(){
        super()
        this.state = {
            value: ""
        }
        this.handleSubjectChange = this.handleSubjectChange.bind(this)
    }

    handleSubjectChange(event, data){
        const subject = data.value
        this.setState({
            value: subject
        })
        this.props.onSubjectChange(subject)
    }
    
    render(){
        return (
            <Dropdown
                search
                selection
                placeholder="Subject"
                options={this.props.subjects}
                onChange={this.handleSubjectChange}
            />
        )
    }
}

export default Subject