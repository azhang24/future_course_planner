import React from "react"
import {Dropdown} from "semantic-ui-react"

class DropdownField extends React.Component{
    constructor(){
        super()
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event, data){
        const val = data.value
        this.setState({
            value: val
        })
        this.props.onChange(val)
    }

    render(){
        return (
            <Dropdown 
                options={this.props.options}
                search
                selection
                value={this.state.value}
                placeholder={this.props.placeholder}
                name={this.props.name}
                onChange={this.handleChange}
            />

        )
    }
}

export default DropdownField
