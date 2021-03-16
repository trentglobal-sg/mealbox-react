import './App.css';
import React from "react"
// import AddComments from "./AddComments"
import CreateRecipe from './CreateRecipe'
import Header from "./Header"
// import Footer from "./Footer"
import ViewAll from "./ViewAll"
import ViewRecipe from "./ViewRecipe"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ScrollToTop from './ScrollToTop';


class App extends React.Component {
    state = {
        pseudo_login: false
    }
    render() {
        return (
            <Router>
                <ScrollToTop>
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
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/new">Create Recipe</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/" render={props => {
                            return <ViewAll {...props} loginStatus={this.state.pseudo_login} />
                        }}>

                        </Route>
                        <Route exact path="/new">
                            <CreateRecipe />
                        </Route>
                        <Route exact path="/view/:l_id" render={props => {
                            return <ViewRecipe {...props} />
                        }}>
                        </Route>
                        <Route exact path="/edit/:l_id" render={props => {
                            return <CreateRecipe {...props} />
                        }}>
                        </Route>
                    </Switch>
                </ScrollToTop>

            </Router>
        );
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
}

export default App;
