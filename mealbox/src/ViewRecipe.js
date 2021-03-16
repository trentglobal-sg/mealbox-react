import React from "react"
import axios from "axios"
const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class ViewRecipe extends React.Component {
    state = {
        individualRecipe: '',
        tempRecipe: '',
        commentsList: [],
        isLoaded: false
    }


    async componentDidMount() {
        let recipe_id = this.props.match.params.l_id;
        let response = await axios.post(baseURL + "/recipes/individual", {
            recipe_id: recipe_id
        })
        let response2 = await axios.post(baseURL + "/comments/individual", {
            recipe_id: recipe_id
        })
        this.setState({
            isLoaded: true,
            individualRecipe: response.data,
            commentsList: response2.data
        })
    }

    addComment = async () => {
        let newComment = {
            recipe_id: this.state.individualRecipe._id,
            username: this.state.comment_name,
            comments: this.state.comment
        }
        await axios.post(baseURL + "/comments", newComment)
        
        this.setState({
            commentsList: [...this.state.commentsList, newComment]
        })
    }

    renderTags = () => {
        let list = [];
        for (let l of this.state.individualRecipe.tags) {
            list.push(<p className="tags-view" key={l}>{l}</p>)
        }
        return list
    }
    renderIngredient = () => {
        let list = [];
        for (let l of this.state.individualRecipe.ingredients) {
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
        list.push(this.state.individualRecipe.instructions.map((instruction, index) => (
            <React.Fragment>
                <h5 key={index}>Step {index + 1} </h5> <p>{instruction}</p>
            </React.Fragment>
        )))
        return list
    }

    renderComments = () => {
        let list = [];
        if (this.state.commentsList[0] == null) {
            list.push(
                <div className="p-2" style={{
                    textAlign:"center"
                }}>Be the first to review this recipe!</div>
            )
        } else {
            for (let l of this.state.commentsList) {
                list.push(
                    <div className="p-2">
                        <h6>{l.username}</h6>
                        <p>{l.comments}</p>
                        <div style={{
                            display: this.props.loginStatus === true ? "block" : "none"
                        }}>
                            <button className="btn action-buttons btn-success ml-2" value={l._id} >Edit</button>
                            <button className="btn action-buttons btn-danger ml-2" value={l._id} >Delete</button>
                        </div>
                    </div>
                )
            }
        }
        return list
    }

    render() {
        if (this.state.isLoaded === false) {
            return (
                <div></div>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="container">
                        <h1>{this.state.individualRecipe.recipe_name}</h1>
                        <div className="tags-wrapper">{this.renderTags()}</div>
                        <p>{this.state.individualRecipe.description}</p>
                        <p>By: <strong>{this.state.individualRecipe.created_by}</strong></p>
                        <div className="row p-2">
                            <div style={{
                                backgroundImage: `url(${this.state.individualRecipe.resource.img_url})`
                            }} className="individual-box col-12 col-md-8">

                            </div>
                            <div className="col-12 col-md-4 mt-2 mt-md-0">
                                <div className="detail-box">
                                    <p><strong>Cook: </strong> {this.state.individualRecipe.cooking_time}</p>
                                    <p><strong>Prep: </strong> {this.state.individualRecipe.preparation_time}</p>
                                    <p><strong>Serving: </strong> {this.state.individualRecipe.serving}</p>
                                    <p><strong>Difficulty: </strong> {this.state.individualRecipe.difficulty}</p>
                                    <p><strong>Cuisine Type: </strong> {this.state.individualRecipe.cuisine_type}</p>
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
                            {this.renderComments()}
                            <hr></hr>
                            <div className="space"></div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}