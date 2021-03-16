import './App.css';
// import AddComments from "./AddComments"
import CreateRecipe from './CreateRecipe'
import Header from "./Header"
// import Footer from "./Footer"
import ViewAll from "./ViewAll"
import ViewRecipe from "./ViewRecipe"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ScrollToTop from './ScrollToTop';


function App() {
    return (
        <Router>
            <ScrollToTop>
            <Header/>
            <nav>
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
                <Route exact path="/" render={props=>{
                    return <ViewAll {...props}/>
                }}>
                 
                </Route>
                <Route exact path="/new">
                    <CreateRecipe/>
                </Route>
                <Route exact path="/view/:l_id" render={props=>{
                    return <ViewRecipe {...props}/>
                }}>
                </Route>
                   <Route exact path="/edit/:l_id" render={props=>{
                    return <CreateRecipe {...props}/>
                }}>
                </Route>
            </Switch>
            </ScrollToTop>

        </Router>
    );
}

export default App;
