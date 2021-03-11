import './App.css';
// import AddComments from "./AddComments"
import CreateRecipe from './CreateRecipe'
// import Header from "./Header"
// import Footer from "./Footer"
import ViewAll from "./ViewAll"
import ViewRecipe from "./ViewRecipe"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/create-recipe">Create Recipe</Link>
                    </li><li>
                        <Link to="/view-all">View Recipe</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="/">
                    <ViewAll/>
                </Route>
                <Route exact path="/create-recipe">
                    <CreateRecipe/>
                </Route>
                <Route exact path="/view-all">
                    <ViewRecipe />
                </Route>
            </Switch>
        </Router>
        // <div className="App">
        //     <Header/>
        //     {/* <CreateRecipe/> */}
        //     {/* <ViewAll/> */}
        //     <ViewRecipe/>
        //     {/* <AddComments/> */}
        //     <Footer/>
        // </div>
    );
}

export default App;
