import './App.css';
// import AddComments from "./AddComments"
import CreateRecipe from './CreateRecipe';
import Header from "./Header"
import Footer from "./Footer"

function App() {
  return (
    <div className="App">
        <Header/>
        <CreateRecipe/>
        {/* <AddComments/> */}
        <Footer/>
    </div>
  );
}

export default App;
