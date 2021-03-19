import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class ViewAll extends React.Component {
    state = {
        recipesList: [],
        search_field: "",
        cuisine_type: "",
        difficulty: "",
    }

    async componentDidMount() {
        let response = await axios.get(baseURL + "/recipes");
        this.setState({
            recipesList: response.data.reverse()
        })
    }

    updateField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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

    // alertBox = (e) => {
    //     alert("You've clicked something")
    // }

    searchQuery = async () => {
        let newSearch = {};
        if (this.state.search_field !== "") {
            newSearch["recipe_name"] = this.state.search_field
        }
        if (this.state.cuisine_type !== "" && this.state.cuisine_type !== "- Cuisine Type -") {
            newSearch["cuisine_type"] = this.state.cuisine_type
        }
        if (this.state.difficulty !== "" && this.state.difficulty !== "- Difficulty Level -") {
            newSearch["difficulty"] = this.state.difficulty
        }
        console.log(newSearch)
        let response = await axios.post(baseURL + "/recipes/search", newSearch)
        console.log(response.data)
        this.setState({
            recipesList: response.data.reverse()
        })
    }
    resetQuery = async() => {
        let response = await axios.get(baseURL+ "/recipes")
        this.setState({
            recipesList: response.data.reverse(),
            search_field: "",
            cuisine_type: "",
            difficulty: "",
        })
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
                        <Link to={"/view/" + l._id} className="des-title">{l.recipe_name}</Link>
                        <p>{l.description}</p>
                        
                <div className="tags-wrapper"> {this.renderTags(l.tags)}</div>
                        <p className="des-created">By: <strong>{l.created_by}</strong></p>
                    </div>
                    <div style={{
                            display: this.props.loginStatus === true ? "flex" : "none"
                        }} className="des-buttons">
                            <Link to={"/edit/" + l._id} className="fas fa-edit edit-btn"></Link>
                           <button className="fas fa-trash-alt delete-btn ml-2" value={l._id} onClick={this.deleteRecipe}></button> 
                        </div>
                </div>
            )
        }
        return list
    }

    renderTags = (tags) => {
        let list = [];
        for (let l of tags) {
            list.push(<p className="tags-home" style={{
                backgroundColor: this.checkColor(l)
            }} key={l}>{l}</p>)
        }
        return list
    }

    checkColor = (text) => {
        if (text === "5-Minutes Or Less"){
            return "#AAD4BE";
        }
        if (text === "Date Night Special"){
            return "#F2CBAA";
        }
        if (text === "Kids Favourite"){
            return "#EEB6B7";
        }
        if (text === "Made From Scratch"){
            return "#ECB8CF";
        }
        if (text === "Slow Cook Required"){
            return "#AFA7CE ";
        }
        if (text === "Suitable For All"){
            return "#A6D6EA";
        }
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
                        <input type="text" className="form-control my-1 mx-sm-2" name="search_field" value={this.state.search_field} placeholder="Search Recipe" onChange={this.updateField} />
                        <select className="form-control cuisine-bar my-1 mx-sm-2" name="cuisine_type" value={this.state.cuisine_type} onChange={this.updateField}>
                            <option defaultValue>- Cuisine Type -</option>
                            <option>American</option>
                            <option>Chinese</option>
                            <option>Italian</option>
                            <option>Japanese</option>
                        </select>
                        <select className="form-control difficulty-bar my-1 mx-sm-2" name="difficulty" value={this.state.difficulty} onChange={this.updateField} >
                            <option defaultValue>- Difficulty -</option>
                            <option>Easy</option>
                            <option>Moderate</option>
                            <option>Hard</option>
                        </select>
                        <div className="filter-buttons">
                            <button type="submit" className="search form-control my-1 mx-sm-2" onClick={this.searchQuery}><i className="fa fa-search"></i></button>
                            <button type="submit" className="search reset form-control my-1 mx-sm-2" onClick={this.resetQuery}><i className="fas fa-undo-alt"></i></button>
                        </div>
                    </div>
                    <div className="filter-des">
                        <p>Showing <strong> {this.state.recipesList.length} </strong> recipes.</p>
                    </div>
                    {this.renderList()}
                    <div className="space"></div>
                </div>
            </React.Fragment>
        )
    }
}