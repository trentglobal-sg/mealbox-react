import React from "react"
import axios from "axios"

const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class ViewRecipe extends React.Component {
    state = {
        recipesList: [],
        commentsList: [],
        _id:"6041a71cbc372816b15bebbf",
        recipe_name: "Spaghetti Aglio o Olio",
        description: "No two spaghetti aglio e olio recipes are alike, but this one is pretty true to the classic method.",
        ingredients: ["1 pound uncooked spaghetti", "6 cloves garlic, thinly sliced", "Half cup olive oil", "Quarter teaspoon red pepper falkes, or to taste", "saly and freshly ground black pepper to taste", "Quarter cup chopped fresh Italian parsley", "1 cup finely grated Parmigiano-Reggiano cheese"],
        cuisine_type: "Italian",
        tags: ["5-Minutes Or Less", "Suitable For All", "Kids Favourite"],
        instructions: ["Bring a large pot of lightly salted water to a boil. Cook spaghetti in the boiling water, stirring occasionally until cooked through but firm to the bite, about 12 minutes. Drain and transfer to a pasta bowl.",
            "Combine garlic and olive oil in a cold skillet. Cook over medium heat to slowly toast garlic, about 10 minutes. Reduce heat to medium-low when olive oil begins to bubble. Cook and stir until garlic is golden brown, about another 5 minutes. Remove from heat.",
            "Stir red pepper flakes, black pepper, and salt into the pasta. Pour in olive oil and garlic, and sprinkle on Italian parsley and half of the Parmigiano-Reggiano cheese; stir until combined.", "Serve pasta topped with the remaining Parmigiano-Reggiano cheese."],
        difficulty: "Easy",
        cooking_time: "22 minutes",
        preparation_time: "10 minutes",
        serving: "4",
        created_by: "James P.Woodmens",
        created_on: "2021-03-05T03:35:56.170Z",
        resource: {
            "_id": "60459d5da0c035371015c0dd",
            "img_url": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3727226.jpg"
        },
        comment_name: "",
        comment: ""
    }

    componentDidMount(){
        let recipe_id = this.props.match.params.l_id;
        this.setState({
            recipe_id: recipe_id
        })
    }

    addComment = async()=>{
        let newComment={
            recipe_id: this.state._id,
            username: this.state.comment_name,
            comments: this.state.comment
        }
        await axios.post(baseURL+"/comments", newComment)
    }

    renderTags = () => {
        let list = [];
        for (let l of this.state.tags) {
            list.push(<p className="tags-view" key={l}>{l}</p>)
        }
        return list
    }
    renderIngredient = () => {
        let list = [];
        for (let l of this.state.ingredients) {
            list.push(<p key={l}>{l}</p>)
        }
        return list
    }

    updateField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderDirections = () => {
        let list = [];
        list.push(this.state.instructions.map((instruction, index) => (
            <React.Fragment>
                <h5 key={index}>Step {index + 1} </h5> <p>{instruction}</p>
            </React.Fragment>
        )))
        return list
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1>{this.state.recipe_name}</h1>
                    <div className="tags-wrapper">{this.renderTags()}</div>
                    <p>{this.state.description}</p>
                    <p>By: <strong>{this.state.created_by}</strong></p>
                    <div className="row p-2">
                        <div style={{
                            backgroundImage: `url(${this.state.resource.img_url})`
                        }} className="individual-box col-12 col-md-8">

                        </div>
                        <div className="col-12 col-md-4 mt-2 mt-md-0">
                            <div className="detail-box">
                                <p><strong>Cook: </strong> {this.state.cooking_time}</p>
                                <p><strong>Prep: </strong> {this.state.preparation_time}</p>
                                <p><strong>Serving: </strong> {this.state.serving}</p>
                                <p><strong>Difficulty: </strong> {this.state.difficulty}</p>
                                <p><strong>Cuisine Type: </strong> {this.state.cuisine_type}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr></hr>
                        <h3>Ingredients</h3>
                        <div className="col-12 col-md-10">
                            {this.renderIngredient()}
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <h3>Directions</h3>
                        <div className="col-12 col-md-10">
                            {this.renderDirections()}
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <h3>Reviews</h3>
                    </div>
                    <div className="comment-wrapper">
                        <div className="form-group p-2 mb-0">
                            <label>
                                Your Name:
                                        </label>
                            <input type="text" name="comment_name" className="form-control" value={this.state.comment_name} onChange={this.updateField} placeholder="Eg. John Dee" />
                        </div>
                        <div className="form-group p-2 mb-0">
                            <label>
                                Review:
                                        </label>
                            <textarea name="comment" className="form-control create-textarea" rows="2" cols="30" value={this.state.comment} onChange={this.updateField} placeholder="Describe your experience!"></textarea>
                        </div>
                        <div style={{
                            textAlign: "center"
                        }}>

                            <button className="comment-submit btn-success ml-auto" onClick={this.addComment}>Submit</button>
                        </div>
                        <hr></hr>
                        <div className="p-2">
                            <h6>Name</h6>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m</p>
                        </div>
                        <hr></hr>
                        <div className="space"></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}