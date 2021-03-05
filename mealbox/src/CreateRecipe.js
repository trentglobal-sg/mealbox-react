import React from "react"
import axios from "axios"
const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class CreateRecipe extends React.Component {
    state = {
        recipesList: [],
        recipe_name: "",
        description: "",
        ingredients: "",
        cuisine_type: "",
        tags: [],
        instructions: "",
        difficulty: "",
        cooking_time: "",
        preparation_time: "",
        serving: "",
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

    // Update Tags state Function for checkboxes
    updateTags = (e) => {
        if (this.state.tags.includes(e.target.value) === false) {
            this.setState({
                [e.target.name]: [...this.state.tags, e.target.value]
            })
        } else {
            this.setState({
                [e.target.name]: [...this.state.tags].filter(selected => selected !== e.target.value)
            })
        }
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
                    <p>Ingredients: {l.ingredients.map((ingredient, index) => (<p key={index}>{ingredient}</p>))}</p>
                    <p>Instructions: {l.instructions.map((instruction, index) => (<p key={index}>Step {index + 1}: {instruction}</p>))}</p>
                    <button>{l.difficulty}</button>
                </div>
            )
        }
        return list
    }

    // Adding a new recipe
    add = async (e) => {
        // Can just split with (",") 
        let regExp = /\s*,\s*/;
        let newIngredients = this.state.ingredients.split(regExp)
        let newInstructions = this.state.instructions.split(regExp)
        let newRecipe = {
            ingredients: newIngredients,
            instructions: newInstructions,
            recipe_name: this.state.recipe_name,
            description: this.state.description,
            cuisine_type: this.state.cuisine_type,
            tags: this.state.tags,
            difficulty: this.state.difficulty,
            cooking_time: this.state.cooking_time,
            preparation_time: this.state.preparation_time,
            serving: this.state.serving,
            created_by: this.state.created_by
        }

        // Posting the comment to db using API link
        let response = await axios.post(baseURL + "/recipes", newRecipe)

        newRecipe._id = response.data.insertedId
        newRecipe.created_on = response.data.ops[0].created_on

        this.setState({
            recipesList: [...this.state.recipesList, newRecipe]
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Create Recipe</h1>
                <div className = "container">
                    <label>
                        Your Name:
                    </label>
                    <input type="text" name="created_by" value={this.state.created_by} onChange={this.updateField} required />
                </div>
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
                <div>
                    <label>
                        Cooking Time:
                    </label>
                    <input type="text" name="cooking_time" value={this.state.cooking_time} onChange={this.updateField} />
                </div>
                <div>
                    <label>
                        Preparation Time:
                    </label>
                    <input type="text" name="preparation_time" value={this.state.preparation_time} onChange={this.updateField} />
                </div>
                <div>
                    <label>
                        Serving Size:
                    </label>
                    <input type="text" name="serving" value={this.state.serving} onChange={this.updateField} />
                </div>
                <div>
                    <label>Difficulty :</label>
                    <input type="radio" name="difficulty" value="Easy" onChange={this.updateField} checked={this.state.difficulty === "Easy"} /><label>Easy</label>
                    <input type="radio" name="difficulty" value="Moderate" onChange={this.updateField} checked={this.state.difficulty === "Moderate"} /><label>Moderate</label>
                    <input type="radio" name="difficulty" value="Hard" onChange={this.updateField} checked={this.state.difficulty === "Hard"} /><label>Hard</label>
                </div>
                <div>
                    <label>Tags:</label>
                    <input type="checkbox" name="tags" value="Slow Cook Required" onChange={this.updateTags} checked={this.state.tags.includes("Slow Cook Required")} /><label>Slow Cook Required</label>
                    <input type="checkbox" name="tags" value="Made From Scratch" onChange={this.updateTags} checked={this.state.tags.includes("Made From Scratch")} /><label>Made From Scratch</label>
                    <input type="checkbox" name="tags" value="Date Night Special" onChange={this.updateTags} checked={this.state.tags.includes("Date Night Special")} /><label>Date Night Special</label>
                    <input type="checkbox" name="tags" value="5-Minutes Or Less" onChange={this.updateTags} checked={this.state.tags.includes("5-Minutes Or Less")} /><label>5-Minutes Or Less</label>
                    <input type="checkbox" name="tags" value="Suitable For All" onChange={this.updateTags} checked={this.state.tags.includes("Suitable For All")} /><label>Suitable For All</label>
                    <input type="checkbox" name="tags" value="Kids Favourite" onChange={this.updateTags} checked={this.state.tags.includes("Kids Favourite")} /><label>Kids Favourite</label>
                </div>
                <div>
                    <label>Ingredients:</label>
                    <div>
                        <textarea name="ingredients" rows="2" cols="30" placeholder="Seperate each ingredients by a comma" value={this.state.ingredients} onChange={this.updateField}></textarea>
                    </div>
                </div>
                <div>
                    <label>Instructions:</label>
                    <div>
                        <textarea name="instructions" rows="2" cols="30" placeholder="Seperate each instructions by a comma" value={this.state.instructions} onChange={this.updateField}></textarea>
                    </div>
                </div>

                <button onClick={this.add}>Submit</button>
                {this.renderList()}
            </React.Fragment>
        )
    }
}