import './App.css';
// import AddComments from "./AddComments"
import CreateRecipe from './CreateRecipe';
import Header from "./Header"

function App() {
  return (
    <div className="App">
        <Header/>
        <CreateRecipe/>
        {/* <AddComments/> */}
    </div>
  );
}

export default App;
