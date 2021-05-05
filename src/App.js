import './App.css';
import React from "react"
// import AddComments from "./AddComments"
import CreateRecipe from './CreateRecipe'
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
                    <div className="bg-light">
                        <nav className="navbar container">
                            {/* <img src={require("./logo.png").default} width="50" height="50" className="logo-img" alt="" />  */}
                            <p className="my-auto ml-2 logo-title" >MealBox</p>
                            <div className="header-url my-auto">
                                    <Link to="/" className="ml-4 link">Home</Link>
                                    <Link to="/new" className="ml-4 link">Create</Link>
                            </div>
                            <button style={{
                                display: this.state.pseudo_login === true ? "none" : "block"
                            }} onClick={this.changeLogin} className="ml-auto acc-btn">SIGN IN</button>
                            <button style={{
                                display: this.state.pseudo_login === false ? "none" : "block"
                            }} onClick={this.changeLogin} className="ml-auto acc-btn">LOG OUT</button> 
                        </nav>
                    </div>
                    <Switch>
                        <Route exact path="/" render={props => {
                            return <ViewAll {...props} loginStatus={this.state.pseudo_login} />
                        }}>

                        </Route>
                        <Route exact path="/new" render={props => {
                            return <CreateRecipe {...props}/>
                        }}>
                        </Route>
                        <Route exact path="/view/:l_id" render={props => {
                            return <ViewRecipe {...props} loginStatus={this.state.pseudo_login}/>
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
