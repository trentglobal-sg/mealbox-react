import './App.css';
// import AddComments from "./AddComments"
// import CreateRecipe from './CreateRecipe'
import Header from "./Header"
import Footer from "./Footer"
// import ViewAll from "./ViewAll"
import ViewRecipe from "./ViewRecipe"

function App() {
  return (
    <div className="App">
        <Header/>
        {/* <CreateRecipe/> */}
        {/* <ViewAll/> */}
        <ViewRecipe/>
        {/* <AddComments/> */}
        <Footer/>
    </div>
  );
}

export default App;
