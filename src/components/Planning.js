import React from "react"
import {Menu} from "semantic-ui-react"
import Checklist from "./Checklist"
import Planner from "./Planner"

class Planning extends React.Component{
    constructor(){
        super()
        this.state = {
            activeItem: ""
        }
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick(event, {name}){
        this.setState(prevState => {
            return {activeItem: name}
        })
    }
    
    render(){
        return (
            <div style={{
                marginTop: 10
            }}>
                <Menu secondary style={{justifyContent: "center"}}>
                    <Menu.Item
                        name='Checklist'
                        active={this.state.activeItem === 'Checklist'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Planner'
                        active={this.state.activeItem === 'Planner'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                {this.state.activeItem === 'Planner' ?
                    <Planner
                        currentSemester={this.props.currentSemester} 
                        lastSemester={this.props.lastSemester}
                        major={this.props.major}
                    /> : 
                this.state.activeItem === 'Checklist' ?
                    <Checklist 
                        major={this.props.major}
                    /> :
                null
                }


            </div>
        )
    }
}

export default Planning