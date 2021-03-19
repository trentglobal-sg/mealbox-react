import React from "react"
import axios from "axios"

const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class CreateRecipe extends React.Component {
    state = {
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
        isLoaded: false,
    }

    // Setting up flags to do editing using CreateRecipe.js
    // When there is a params, set a new state call recipe_id
    async componentDidMount() {
        if (this.props.match.path !== "/new") {
            let recipe_id = this.props.match.params.l_id;
            let response = await axios.post(baseURL + "/recipes/individual", {
                recipe_id: recipe_id
            })
            // console.log(response.data)
            this.setState({
                //Flag
                isLoaded: true,
                //Recipes Collection
                recipe_id: recipe_id,
                recipe_name: response.data.recipe_name,
                description: response.data.description,
                ingredients: response.data.ingredients.join(" ! "),
                cuisine_type: response.data.cuisine_type,
                tags: response.data.tags,
                instructions: response.data.instructions.join(" ! "),
                difficulty: response.data.difficulty,
                cooking_time: response.data.cooking_time,
                preparation_time: response.data.preparation_time,
                serving: response.data.serving,
                created_by: response.data.created_by,
                //Resource Collection
                resource_id: response.data.resource._id,
                img_url: response.data.resource.img_url,
            })
        }
        else {
            this.setState({
                isLoaded: true
            })
        }
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


    // Adding a new recipe
    add = async () => {
        // Update resource Collections first
        let newResource = {
            img_url: this.state.img_url
        }

        let resourceResponse = await axios.post(baseURL + "/resources", newResource)
        let newResourceID = resourceResponse.data.insertedId

        // Can just split with (",") 
        let regExp = /\s*!\s*/;
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

        // Posting the recipe to db using API link
        await axios.post(baseURL + "/recipes", newRecipe)
        // let recipeResponse = await axios.post(baseURL + "/recipes", newRecipe)
        this.props.history.push("/")
        // window.location.reload("/")
    }

    edit = async () => {
        // Update Resource Collections First
        let newResource = {
            _id: this.state.resource_id,
            img_url: this.state.img_url
        }
        let response = await axios.put(baseURL + "/resources", newResource)
        // console.log(response.data)
        // Update Recipe Collections
        let regExp = /\s*!\s*/;
        let newIngredients = this.state.ingredients.split(regExp)
        let newInstructions = this.state.instructions.split(regExp)
        let newRecipe = {
            recipe_id: this.state.recipe_id,
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
                _id: this.state.resource_id,
                img_url: this.state.img_url
            }
        }
        let response2 = await axios.put(baseURL + "/recipes", newRecipe)
        // console.log(response2.data)
        if (response.data.Message === "Updated Resource" && response2.data.Message === "Updated Recipe") {
            this.props.history.push("/")
        }
    }

    cancel = () => {
        this.props.history.push("/")
    }

    render() {
        if (this.state.isLoaded === false) {
            return (
                <div></div>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="hero-img">
                        <div className="cover-overlay"></div>
                    </div>
                    <div className="container p-3">
                        <div className="content-wrapper p-3">
                            <section className="row">
                                <h1 className="col-12" style={{
                                    textAlign: "center",
                                    display: this.state.recipe_id == null ? "block" : "none"
                                }}>Create Recipe</h1>
                                <h1 className="col-12" style={{
                                    textAlign: "center",
                                    display: this.state.recipe_id != null ? "block" : "none"
                                }}>Edit Recipe</h1>
                                {/* Left Box  */}
                                <div className="col-lg-8 col-12 left-box">
                                    <div className="form-group">
                                        <label>
                                            Your Name:
                                        </label>
                                        <input type="text" name="created_by" className="form-control" value={this.state.created_by} onChange={this.updateField} required />
                                        {/* <span className="warning-text">*Name must be at least 3 characters long.</span> */}
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Recipe Name:
                                        </label>
                                        <input type="text" name="recipe_name" className="form-control" value={this.state.recipe_name} onChange={this.updateField} />
                                        {/* <span className="warning-text">*Recipe name must be at least 3 characters long.</span> */}
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Recipe Image URL:
                                        </label>
                                        <input type="text" name="img_url" className="form-control" value={this.state.img_url} onChange={this.updateField} />
                                        {/* <span className="warning-text">*URL cannot be empty.</span> */}
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
                                        {/* <span className="warning-text">*Select a cuisine type.</span> */}
                                    </div>
                                </div>

                                {/* Right Box */}
                                <div className="col-12 col-lg-4 right-box">
                                    <div className="form-group">
                                        <label>
                                            Cooking Time:
                                         </label>
                                        <input type="text" name="cooking_time" className="form-control" value={this.state.cooking_time} onChange={this.updateField} />
                                        {/* <span className="warning-text">*Cooking time cannot be empty.</span> */}
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Preparation Time:
                                        </label>
                                        <input type="text" name="preparation_time" className="form-control" value={this.state.preparation_time} onChange={this.updateField} />
                                        {/* <span className="warning-text">*Preparation time cannot be empty.</span> */}

                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Serving Size:
                                        </label>
                                        <input type="text" name="serving" className="form-control" value={this.state.serving} onChange={this.updateField} />
                                        {/* <span className="warning-text">*Serving size cannot be empty.</span> */}
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
                                        {/* <span className="warning-text">*Select one difficulty.</span> */}
                                    </div>
                                </div>

                                <section className="col-12 mt-2">
                                    <div className="form-group">
                                        <label>
                                            Description:
                                        </label>
                                        <input type="text" name="description" className="form-control description-textarea" value={this.state.description} onChange={this.updateField} />
                                        {/* <span className="warning-text">*Description cannot be empty or more than 100 characters.</span> */}
                                    </div>
                                    <div>
                                        <label>Tags:</label>
                                        <div className="form-check" >
                                            <div>
                                                <input type="checkbox" name="tags" value="5-Minutes Or Less" onChange={this.updateTags} checked={this.state.tags.includes("5-Minutes Or Less")} /><label className="ml-2">5-Minutes Or Less</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="tags" value="Date Night Special" onChange={this.updateTags} checked={this.state.tags.includes("Date Night Special")} /><label className="ml-2">Date Night Special</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="tags" value="Kids Favourite" onChange={this.updateTags} checked={this.state.tags.includes("Kids Favourite")} /><label className="ml-2">Kids Favourite</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="tags" value="Made From Scratch" onChange={this.updateTags} checked={this.state.tags.includes("Made From Scratch")} /><label className="ml-2">Made From Scratch</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="tags" value="Slow Cook Required" onChange={this.updateTags} checked={this.state.tags.includes("Slow Cook Required")} /><label className="ml-2">Slow Cook Required</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="tags" value="Suitable For All" onChange={this.updateTags} checked={this.state.tags.includes("Suitable For All")} /><label className="ml-2">Suitable For All</label>
                                            </div>
                                        </div>
                                        {/* <span className="warning-text">*Select at least one tag</span> */}
                                    </div>
                                    <div>
                                        <label>Ingredients:</label>
                                        <div>
                                            <textarea name="ingredients" className="form-control create-textarea" rows="2" cols="30" placeholder="Seperate each ingredients by a exclaimation mark" value={this.state.ingredients} onChange={this.updateField}></textarea>
                                        </div>
                                        {/* <span className="warning-text">*Ingredients cannot be empty</span> */}
                                    </div>
                                    <div>
                                        <label>Instructions:</label>
                                        <div>
                                            <textarea name="instructions" className="form-control create-textarea" rows="2" cols="30" placeholder="Seperate each instructions by a exclaimation mark" value={this.state.instructions} onChange={this.updateField}></textarea>
                                        </div>
                                        {/* <span className="warning-text">*Instructions cannot be empty</span> */}
                                    </div>

                                    <div className="mt-2" style={{
                                        textAlign: "center"
                                    }}>
                                        <button style={{
                                            display: this.state.recipe_id == null ? "inline-block" : "none"
                                        }}
                                            className="btn action-buttons btn-warning" onClick={this.add}>Create</button>
                                        <button style={{
                                            display: this.state.recipe_id != null ? "inline-block" : "none"
                                        }}
                                            className="btn action-buttons btn-warning" onClick={this.edit}>Submit</button>
                                        <button className="btn action-buttons btn-secondary ml-2" onClick={this.cancel} >Cancel</button>
                                    </div>

                                </section>
                            </section>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}