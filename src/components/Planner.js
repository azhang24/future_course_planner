import React from "react"
import CourseRow from "./CourseRow"
import DropdownField from "./DropdownField"

class Planner extends React.Component{
    constructor(){
        super()
        this.state = {
            rows: [],
            semester: "",
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSemester = this.handleSemester.bind(this)
        this.generateSemesters = this.generateSemesters.bind(this)
        this.removeRow = this.removeRow.bind(this)
    }

    addClasses(rows){
        const min = 1
        const max = 100000
        const rand = min + Math.random() * (max - min)
        rows.push(<CourseRow 
                    key={rand}
                    id={rand} 
                    chosenSemester={this.state.semester}
                    onRemove={this.removeRow}
                    />)
        return rows
    }

    handleClick(){
        this.setState(prevState => {
            return {
                rows: this.addClasses(prevState.rows, prevState.rows.length),
            }
        })
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSemester(event, semesterValue){
        this.setState(prevState => {
            return {
                rows: prevState.rows,
                semester: semesterValue,
            }
        })
    }

    removeRow(row_id){
        this.setState(prevState => {
            const new_rows = prevState.rows.filter(row => row.props.id !== row_id)
            return {
                rows: new_rows,
                semester: prevState.semester
            }
        })
    }

    generateSemesters(startSemester, finalSemester){
        if(startSemester === undefined || finalSemester === undefined 
            || startSemester === "" || finalSemester === ""){
            return [];
        }
        let currSemester = startSemester
        let semesters = []
        while(currSemester !== finalSemester){
            let semesterObject = 
                {key: currSemester, 
                value: currSemester, 
                text: currSemester}
            semesters.push(semesterObject)
            let season = currSemester.split(" ")[0]
            let year = parseInt(currSemester.split(" ")[1], 10)
            if(season === "Spring"){
                currSemester = "Fall " + year
            }
            else if(season === "Fall"){
                currSemester = "Spring " + (year + 1)
            }
        }
        semesters.push({key: currSemester, 
            value: currSemester, 
            text: currSemester})
        return semesters;
    }
    
    render(){
        return (
            <div style={{width: 1000}}>
                <DropdownField
                    options=
                    {this.generateSemesters(this.props.currentSemester, 
                                            this.props.lastSemester)}
                    placeholder="Select Semester"
                    name="semester"
                    onChange={this.handleSemester}
                />
                <table className="ui celled table">
                    <thead>
                        <tr style={{textAlign: 'center'}}>
                            <th>Subject</th>
                            <th>Course Name</th>
                            <th>Requirement</th>
                            <th>Credits</th>
                            <th>Remove Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows.map((row) => {
                            return row
                        })}
                    </tbody>
                </table>
                <button 
                    className="positive ui button"
                    onClick={this.handleClick}
                >Add Course</button>
            </div>
        )
    }
}

export default Planner