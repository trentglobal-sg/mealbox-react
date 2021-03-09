import React from "react"
import axios from "axios"

const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class ViewAll extends React.Component {
    state = {
        recipesList: [],
    }

    async componentDidMount() {
        let response = await axios.get(baseURL + "/recipes");
        this.setState({
            recipesList: response.data
        })
    }

    renderList = () => {
        let list = [];
        for (let l of this.state.recipesList) {
            list.push(
                <div key={l._id}>
                    <h5>{l.recipe_name}</h5>
                    <p>{l.description}</p>
                    <p>{l.cuisine_type}</p>
                    <p>By: {l.created_by}</p>
                    <p>{(l.created_on).slice(0, 10)}</p>
                    <p>Preparation Time:{l.preparation_time}</p>
                    <p>Cooking Time:{l.cooking_time}</p>
                    <p>Serving: {l.serving}</p>
                    <p>Tags: {l.tags.join(", ")}</p>
                    <p>Ingredients: {l.ingredients.map((ingredient, index) => (<p key={index}>{ingredient}</p>))}</p>
                    <p>Instructions: {l.instructions.map((instruction, index) => (<p key={index}>Step {index + 1}: {instruction}</p>))}</p>
                    <button>{l.difficulty}</button>
                </div>
            )
        }
        return list
    }

    render(){
        return (
            <React.Fragment>    
                
                {this.renderList()}
            </React.Fragment>
        )
    }
}