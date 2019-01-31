import React from "react"

class Header extends React.Component {
    render(){
        const styles = {
            textAlign: "center",
            marginTop: 10
        }
        return (
            <div style={styles}>
                <h1 className="header">Planning Dashboard</h1>
            </div>
        )
    }
}

export default Header