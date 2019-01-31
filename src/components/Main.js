import React from "react"
import {Input} from 'semantic-ui-react'
import {Dropdown} from 'semantic-ui-react'
import Planning from "./Planning"

class Main extends React.Component{
    constructor(){
        super()
        this.state = {
            currentSemester: "",
            lastSemester: "",
            subjects: [],
            majorQuery: "",
            value: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDropdown = this.handleChangeDropdown.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    componentDidMount(){
        const date = new Date()
        const year = date.getFullYear()
        const yearAbrev = date.getFullYear() % 1000
        const month = date.getMonth() + 1
        let season
        if(month >= 1 && month <= 5){
            season = "SP"
        }
        else{
            season = "FA"
        }
        let semester = season + yearAbrev
        const url = "https://classes.cornell.edu/api/2.0/config/subjects.json?roster=" + semester
        fetch(url)
            .then(response => response.json())
            .then(data => {
                var subjects_array = data.data.subjects
                var subject_objects = subjects_array.map((subject) => {
                    return {key: subject.value, 
                            value: subject.descr,
                            text: "(" + subject.value + ") " + subject.descr}
                })
                this.setState(prevState => {
                    if (season === "FA"){
                        season = "Fall"
                    }
                    else if(season === "SP"){
                        season = "Spring"
                    }
                    return {
                        currentSemester: season + " " + year,
                        lastSemester: prevState.lastSemester,
                        subjects: subject_objects,
                        majorQuery: prevState.majorQuery,
                        value: prevState.value
                    }
                })
            })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleChangeDropdown = (event, {majorQuery, value}) => this.setState({majorQuery, value})

    handleSearchChange = (event, {majorQuery}) => this.setState({majorQuery}) 

    render(){
        const subjects = this.state.subjects
        return (
            <div>
                <form style={
                    {display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'center'}
                }>
                    <label style={{marginRight: 20}}>
                        Last Semester: 
                        <Input 
                            placeholder="Semester (e.g. Fall 2019)"
                            value={this.state.lastSemester}
                            name="lastSemester"
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                    <label style={{marginRight: 20}}>
                        Major:
                        <Dropdown
                            options={subjects}
                            required
                            search
                            selection
                            placeholder="Major"
                            value={this.state.value}
                            name="major"
                            onChange={this.handleChangeDropdown}
                            onSearchChange={this.handleSearchChange}
                            searchQuery={this.state.majorQuery}
                        />
                    </label>
                    <button className="ui primary button">Save</button>
                </form>
                <Planning 
                    currentSemester={this.state.currentSemester}
                    lastSemester={this.state.lastSemester}
                    major={this.state.value}
                />
            </div>
            
        )
    }
}

export default Main