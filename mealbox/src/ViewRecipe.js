import React from "react"
import axios from "axios"
const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class ViewRecipe extends React.Component {
    state = {
        individualRecipe: '',
        tempRecipe: '',
        commentsList: [],
        comment: "",
        comment_name: "",
        comment_id: "",
        search_comment: "",
        isEditing: false,
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
            commentsList: response2.data.reverse()
        })
    }

    addComment = async () => {
        let newComment = {
            recipe_id: this.state.individualRecipe._id,
            username: this.state.comment_name,
            comments: this.state.comment
        }
        let response = await axios.post(baseURL + "/comments", newComment)
        // console.log(response.data)
        if (response.data.Message === "Comments Inserted") {
            this.setState({
                commentsList: [newComment, ...this.state.commentsList]
            })
        }
    }

    resetQuery = async () => {
        let recipe_id = this.props.match.params.l_id;
        let response = await axios.post(baseURL + "/comments/individual", {
            recipe_id: recipe_id
        })
        this.setState({
            commentsList: response.data.reverse(),
            search_comment: "",
        })
    }

    searchQuery = async () => {
        let newSearch = {};
        let recipe_id = this.props.match.params.l_id;
        if (this.state.search_comment !== "") {
            newSearch["search_query"] = this.state.search_comment
        }
        // console.log(newSearch)
        let response = await axios.post(baseURL + "/comments/" + recipe_id + "/search", newSearch)
        // console.log(response.data)
        this.setState({
            commentsList: response.data.reverse()
        })
    }

    renderTags = () => {
        let list = [];
        for (let l of this.state.individualRecipe.tags) {
            list.push(<p className="tags-view" style={{
                backgroundColor: this.checkColor(l)
            }} key={l}>{l}</p>)
        }
        return list
    }
    checkColor = (text) => {
        if (text === "5-Minutes Or Less") {
            return "#AAD4BE";
        }
        if (text === "Date Night Special") {
            return "#F2CBAA";
        }
        if (text === "Kids Favourite") {
            return "#EEB6B7";
        }
        if (text === "Made From Scratch") {
            return "#ECB8CF";
        }
        if (text === "Slow Cook Required") {
            return "#AFA7CE ";
        }
        if (text === "Suitable For All") {
            return "#A6D6EA";
        }
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
                <div style={{
                    display: "flex"
                }}>
                    <i class="fas fa-check-circle mt-1"></i><h5 className="ml-2" key={index}>Step {index + 1} </h5> 
                </div>
                <p>{instruction}</p>
            </React.Fragment>
        )))
        return list
    }

    renderComments = () => {
        let list = [];
        if (this.state.commentsList[0] == null) {
            list.push(
                <div className="p-2" style={{
                    textAlign: "center"
                }}>Be the first to review this recipe!</div>
            )
        } else {
            for (let l of this.state.commentsList) {
                list.push(
                    <div className="p-1" style={{
                        position:"relative"
                    }} key={l.id}>
                        <h6><strong>{l.username}</strong></h6>
                        <p>{l.comments}</p>
                        <div style={{
                            display: this.props.loginStatus === true ? "flex" : "none"
                        }} className="view-btn">
                            {/* <button className="btn action-buttons btn-success ml-2" value={l._id} onClick={this.editComment}>Edit</button> */}
                           <button className="fas fa-edit delete-btn" style={{
                               backgroundColor:"rgb(90, 207, 90)"
                           }} value={l._id} onClick={this.editComment}></button> 
                           <button className="fas fa-trash-alt delete-btn ml-2" value={l._id} onClick={this.deleteComment}></button> 
                        </div>
                        <hr></hr>
                    </div>
                )
            }
        }
        return list
    }

    editComment = (e) => {
        for (let i in this.state.commentsList) {
            if (this.state.commentsList[i]._id === e.target.value) {
                this.setState({
                    comment_id: e.target.value,
                    comment_name: this.state.commentsList[i].username,
                    comment: this.state.commentsList[i].comments,
                    isEditing: true
                })
            }
        }
    }

    putComment = async () => {
        let newComment = {
            _id: this.state.comment_id,
            username: this.state.comment_name,
            comments: this.state.comment
        }
        let response = await axios.put(baseURL + "/comments", newComment)
        // console.log(response.data.message)
        if (response.data.message === "Updated Comments") {
            let recipe_id = this.props.match.params.l_id;
            let response = await axios.post(baseURL + "/comments/individual", {
                recipe_id: recipe_id
            })
            this.setState({
                isEditing: false,
                commentsList: response.data,
                comment_name: "",
                comment: ""

            })
        }
    }
    cancel = () => {
        this.setState({
            isEditing: false,
            comment_name: "",
            comment: ""
        })
    }

    deleteComment = async (e) => {
        let response = await axios.delete(baseURL + "/comments/" + e.target.value)
        if (response.data.Message === "Deleted comment") {
            let recipe_id = this.props.match.params.l_id;
            let response = await axios.post(baseURL + "/comments/individual", {
                recipe_id: recipe_id
            })
            this.setState({
                commentsList: response.data
            })
        }
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
                        <div className="content-wrapper mt-2 p-3">
                            <h1><strong>{this.state.individualRecipe.recipe_name}</strong></h1>
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
                                        <i class="fas fa-clock detail-clock"></i>
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
                                <h3><strong>Ingredients</strong></h3>
                                <div className="col-12 col-md-10">
                                    {this.renderIngredient()}
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                                <h3><strong>Directions</strong></h3>
                                <div className="col-12 col-md-10">
                                    {this.renderDirections()}
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                                <h3><strong>Reviews</strong></h3>
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
                                    <button style={{
                                        display: this.state.isEditing === false ? "none" : "inline-block"
                                    }} className="comment-submit btn-success ml-auto" onClick={this.putComment} >Submit</button>
                                    <button style={{
                                        display: this.state.isEditing === false ? "none" : "inline-block"
                                    }} className="comment-submit btn-secondary ml-1" onClick={this.cancel} >Cancel</button>
                                    <button style={{
                                        display: this.state.isEditing === false ? "inline-block" : "none"
                                    }} className="comment-submit btn-warning ml-auto" onClick={this.addComment}>Create</button>
                                </div>
                                <hr></hr>
                                <div style={{
                                    display: this.props.loginStatus === true ? "flex" : "none"
                                }} className="comment-filter p-2">
                                    <input type="text" className="form-control" placeholder="Search Comments" value={this.state.search_comment} name="search_comment" onChange={this.updateField}></input>
                                    <div className="filter-buttons">
                                        <button type="submit" className="search form-control ml-1" onClick={this.searchQuery}><i className="fa fa-search"></i></button>
                                        <button type="submit" className="search reset2 form-control ml-1" onClick={this.resetQuery}><i className="fas fa-undo-alt"></i></button>
                                    </div>
                                </div>
                                {this.renderComments()}
                                <hr></hr>
                            </div>
                        </div>
                                <div className="space"></div>
                    </div>
                </React.Fragment>
            )
        }
    }
}