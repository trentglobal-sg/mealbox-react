import React from "react"
import axios from "axios"
const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class CreateRecipe extends React.Component {
    state = {
        recipesList: [],
        recipe_name: "",
        description: "",
        ingredients: [],
        cuisine_type: "",
        tags: [],
        instructions: [],
        difficulty: "",
        cooking_time: "",
        preparation_time: "",
        serving: 0,
        created_by: ""


    }

    // Lifecycle Import
    async componentDidMount() {
        let response = await axios.get(baseURL + "/recipes");
        this.setState({
            recipesList: response.data
        })
    }

    // Generic update form; ensure name in state is the same as name in form
    updateField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderList = () => {
        let list = [];
        for (let l of this.state.recipesList) {
            list.push(
                <div key={l._id}>
                    <h5>{l.recipe_name}</h5>
                    <p>"{l.description}</p>
                    <p>{l.cuisine_type}</p>
                    <p>By: {l.created_by}</p>
                    <p>{(l.created_on).slice(0, 10)}</p>
                    <p>Preparation Time:{l.preparation_time}</p>
                    <p>Cooking Time:{l.cooking_time}</p>
                    <p>Serving: {l.serving}</p>
                    <p>Tags: {l.tags.join(", ")}</p>
                    <button>{l.difficulty}</button>
                </div>
            )
        }
        return list
    }

    render() {
        return (
            <React.Fragment>
                <h1>Create Recipe</h1>
                <div>
                    <label>
                        Recipe Name:
                    </label>
                    <input type="text" name="recipe_name" value={this.state.recipe_name} onChange={this.updateField} />
                </div>
                <div>
                    <label>
                        Description:
                    </label>
                    <input type="text" name="description" value={this.state.description} onChange={this.updateField} />
                </div>
                <div>
                    <label>
                        Cuisine Type:
                    </label>
                    <select name="cuisine_type" value={this.state.cuisine_type} onChange={this.updateField}>
                        <option>American</option>
                        <option>Chinese</option>
                        <option>Italian</option>
                        <option>Japanese</option>
                    </select>
                </div>
                {this.renderList()}
            </React.Fragment>
        )
    }
}