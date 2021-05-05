import React from "react"

export default class Header extends React.Component {
    constructor(props){
        super(props)
        this.setState({
            login: false
        })
    }
    state = {
        pseudo_login: false
    }


    changeLogin = () =>{
        if (this.state.pseudo_login === false){
            this.setState({
                pseudo_login : true
            })
        } else (
            this.setState({
                pseudo_login: false
            })
        )
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar">
                        <img src={require("./logo.png").default} width="50" height="50" className="d-inline-block" alt="" /> 
                        <p className="my-auto ml-2" style={{
                            fontWeight: "bold"
                        }}>MealBox</p>
                        <button style={{
                            display: this.state.pseudo_login === true ? "none" : "block"
                        }} onClick={this.changeLogin}>Sign in</button>
                        <button style={{
                            display: this.state.pseudo_login === false ? "none" : "block"
                        }} onClick={this.changeLogin}>Log out</button> 
                </nav>
            </React.Fragment>
        )
    }


}