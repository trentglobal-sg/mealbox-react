import React from "react"

export default class Header extends React.Component {
    state = {

    }


    render() {
        return (
            <React.Fragment>
                <nav className="navbar">
                        <img src={require("./logo.png").default} width="50" height="50" className="d-inline-block" alt="" /> 
                        <p className="my-auto ml-2" style={{
                            fontWeight: "bold"
                        }}>MealBox</p>
                </nav>
            </React.Fragment>
        )
    }


}