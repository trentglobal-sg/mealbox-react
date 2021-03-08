import React from "react"
import axios from "axios"

const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class CreateRecipe extends React.Component {
    state = {
        recipesList: [],
        //Recipe Collection
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
        created_by: "",
        //Resources Collection
        img_url: "",



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

    // Adding a new recipe
    add = async (e) => {
        // Update resource Collections first
        let newResource = {
            img_url: this.state.img_url
        }

        let resourceResponse = await axios.post(baseURL + "/resources", newResource)
        let newResourceID = resourceResponse.data.insertedId

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
            created_by: this.state.created_by,
            resource: {
                _id: newResourceID,
                img_url: this.state.img_url
            }
        }

        // Posting the comment to db using API link
        let recipeResponse = await axios.post(baseURL + "/recipes", newRecipe)

        newRecipe._id = recipeResponse.data.insertedId
        newRecipe.created_on = recipeResponse.data.ops[0].created_on

        this.setState({
            recipesList: [...this.state.recipesList, newRecipe]
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid p-3">
                    <section className="row">
                        <div className="col-xl-8 col-11 mx-auto my-auto">
                            <section className="row">
                                <h1 className="col-12" style={{
                                    textAlign:"center"
                                }}>Create Recipe</h1>
                                {/* Left Box  */}
                                <div className="col-lg-8 col-12 left-box">
                                    <div className="form-group">
                                        <label>
                                            Your Name:
                            </label>
                                        <input type="text" name="created_by" className="form-control" value={this.state.created_by} onChange={this.updateField} required />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Recipe Name:
                             </label>
                                        <input type="text" name="recipe_name" className="form-control" value={this.state.recipe_name} onChange={this.updateField} />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Recipe Image URL:
                        </label>
                                        <input type="text" name="img_url" className="form-control" value={this.state.img_url} onChange={this.updateField} />
                                    </div>
                                    <div>
                                        <label>
                                            Cuisine Type:
                                </label>
                                        <select className="form-control my-1 mr-sm-2" name="cuisine_type" value={this.state.cuisine_type} onChange={this.updateField}>
                                            <option selected>Choose...</option>
                                            <option>American</option>
                                            <option>Chinese</option>
                                            <option>Italian</option>
                                            <option>Japanese</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Right Box */}
                                <div className="col-12 col-lg-4 right-box">
                                    <div className="form-group">
                                        <label>
                                            Cooking Time:
                             </label>
                                        <input type="text" name="cooking_time" className="form-control" value={this.state.cooking_time} onChange={this.updateField} />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Preparation Time:
                            </label>
                                        <input type="text" name="preparation_time" className="form-control" value={this.state.preparation_time} onChange={this.updateField} />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Serving Size:
                             </label>
                                        <input type="text" name="serving" className="form-control" value={this.state.serving} onChange={this.updateField} />
                                    </div>
                                    <div>
                                        <label>Difficulty:</label>
                                        <div style={{
                                            textAlign: "center",
                                            marginTop: "5px"
                                        }}>
                                            <input type="radio" name="difficulty" className="mr-1" value="Easy" onChange={this.updateField} checked={this.state.difficulty === "Easy"} /><label className="mr-2">Easy</label>
                                            <input type="radio" name="difficulty" className="mr-1" value="Moderate" onChange={this.updateField} checked={this.state.difficulty === "Moderate"} /><label className="mr-2">Moderate</label>
                                            <input type="radio" name="difficulty" className="mr-1" value="Hard" onChange={this.updateField} checked={this.state.difficulty === "Hard"} /><label className="mr-2">Hard</label>
                                        </div>
                                    </div>
                                </div>

                                <section className="col-12 mt-2">
                                    <div className="form-group">
                                        <label>
                                            Description:
                            </label>
                                        <input type="text" name="description" className="form-control description-textarea" value={this.state.description} onChange={this.updateField} />
                                    </div>
                                    <div>
                                        <label>Tags:</label>
                                        <div className="form-check" >
                                            <div>
                                                <input type="checkbox" name="tags" value="Slow Cook Required" onChange={this.updateTags} checked={this.state.tags.includes("Slow Cook Required")} /><label className="ml-2">Slow Cook Required</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="tags" value="Made From Scratch" onChange={this.updateTags} checked={this.state.tags.includes("Made From Scratch")} /><label className="ml-2">Made From Scratch</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="tags" value="Date Night Special" onChange={this.updateTags} checked={this.state.tags.includes("Date Night Special")} /><label className="ml-2">Date Night Special</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="tags" value="5-Minutes Or Less" onChange={this.updateTags} checked={this.state.tags.includes("5-Minutes Or Less")} /><label className="ml-2">5-Minutes Or Less</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="tags" value="Suitable For All" onChange={this.updateTags} checked={this.state.tags.includes("Suitable For All")} /><label className="ml-2">Suitable For All</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="tags" value="Kids Favourite" onChange={this.updateTags} checked={this.state.tags.includes("Kids Favourite")} /><label className="ml-2">Kids Favourite</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label>Ingredients:</label>
                                        <div>
                                            <textarea name="ingredients" className="form-control create-textarea" rows="2" cols="30" placeholder="Seperate each ingredients by a comma" value={this.state.ingredients} onChange={this.updateField}></textarea>
                                        </div>
                                    </div>
                                    <div>
                                        <label>Instructions:</label>
                                        <div>
                                            <textarea name="instructions" className="form-control create-textarea" rows="2" cols="30" placeholder="Seperate each instructions by a comma" value={this.state.instructions} onChange={this.updateField}></textarea>
                                        </div>
                                    </div>

                                    <div className="mt-2" style={{
                                        textAlign: "center"
                                    }}>
                                        <button onClick={this.add}>Submit</button>
                                        <button className="ml-2" >Cancel</button>
                                    </div>

                                </section>
                            </section>
                            {/* {this.renderList()} */}
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}