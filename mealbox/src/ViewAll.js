import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"

const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class ViewAll extends React.Component {
    state = {
        recipesList: [],
    }

    async componentDidMount() {
        let response = await axios.get(baseURL + "/recipes");
        this.setState({
            recipesList: response.data.reverse()
        })
    }

    deleteRecipe = async (e) => {
        let index = this.state.recipesList.findIndex(i => i._id === e.target.value)

        // To delete from recipes collection
        await axios.delete(baseURL + "/recipes/" + e.target.value)
        // To delete from resource collection
        await axios.delete(baseURL + "/resources/" + this.state.recipesList[index].resource._id)
        this.setState({
            recipesList: [...this.state.recipesList.slice(0, index), ...this.state.recipesList.slice(index + 1)]
        })
    }

    alertBox = (e) => {
        alert("You've clicked the title box")
    }

    renderList = () => {
        let list = [];
        for (let l of this.state.recipesList) {
            list.push(
                <div className="box col-12 p-2 mt-2" key={l._id}>
                    <div style={{
                        backgroundImage: `url(${l.resource.img_url})`
                    }} className="image-container col-12 col-md-4">
                    </div>
                    <div className="des-container col-12 col-md-8 mt-2">
                    <Link to={"/view/"+l._id}>{l.recipe_name}</Link>
                        <p>{l.description}</p>
                        <p>By: <strong>{l.created_by}</strong></p>
                        <div style={{
                            display: this.props.loginStatus === true ? "block" : "none"
                        }}className="des-buttons mt-2">
                            <Link to={"/edit/"+l._id} className="btn btn-success action-buttons">Edit</Link>
                            <button className="btn action-buttons btn-danger ml-2" value={l._id} onClick={this.deleteRecipe} >Delete</button>
                        </div>
                    </div>
                </div>
            )
        }
        return list
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                <div className="hero-wrapper">
                    <div className="home-hero-img">
                        <div className="hero-title">
                            <h2>Recreate</h2>
                            <h2>Recipe</h2>
                            <p>Looking to recreate a dish?</p>
                            <p>Find it a hassle to buy ingredients?</p>
                            <p>With a single delivery you will have all you need. </p>


                        </div>
                        <div className="cover-overlay home-overlay"></div>
                    </div>
                </div>
                {/* <div className="container"> */}
                    {/* <div className="row"></div> */}

                    <div className="filter-bar">
                        <input type="text" className="form-control my-1 mx-sm-2" name="search-field" placeholder="Search Recipe Name" />
                        <select className="form-control cuisine-bar my-1 mx-sm-2" name="cuisine_type" value={this.state.cuisine_type}>
                            <option defaultValue>Cuisine Type</option>
                            <option>Show All</option>
                            <option>American</option>
                            <option>Chinese</option>
                            <option>Italian</option>
                            <option>Japanese</option>
                        </select>
                        <select className="form-control difficulty-bar my-1 mx-sm-2" name="difficulty" value={this.state.cuisine_type} >
                            <option defaultValue>Difficulty Level</option>
                            <option>Show All</option>
                            <option>Easy</option>
                            <option>Moderate</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    {this.renderList()}
                </div>
            </React.Fragment>
        )
    }
}