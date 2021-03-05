import React from "react"
import axios from "axios"

const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class AddComments extends React.Component {
    state = {
        commentsList: [],
        comments: "",
        username: "",
        recipe_name: "",
        user_id: "",
        recipe_id: "",
        _id: "",

    }

    // Lifecycle Import
    async componentDidMount() {
        let response = await axios.get(baseURL + "/comments");
        this.setState({
            commentsList: response.data
        })
    }

    // List rendering using for loop
    renderCommentsList = () => {
        let list = [];
        for (let l of this.state.commentsList) {
            list.push(
                <div key={l._id}>
                    <h5>{l.recipe_name}</h5>
                    <p>ID:{l.recipe_id}</p>
                    <p>{l.comments}</p>
                    <p>By: {l.username}</p>
                    <p>{(l.last_updated).slice(0,10)}</p>
                    <button value={l._id} onClick={this.deleteComment}>Delete</button>
                </div>
            )
        }
        return list
    }
    
    // Generic update form; ensure name in state is the same as name in form
    updateField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Adding a new comment
    add = async (e) => {
        let newComment = {
            comments: this.state.comments,
            username: this.state.username,
            recipe_name: this.state.recipe_name,
            user_id: this.state.user_id,
            recipe_id: this.state.recipe_id,
        }

        // Posting the comment to db using API link
        let response  = await axios.post(baseURL + "/comments", newComment)

        newComment._id = response.data.insertedId

        this.setState({
            commentsList : [...this.state.commentsList, newComment]
        })
    }

    // Deleting comment
    deleteComment = async (e) => {
        let index = this.state.commentsList.findIndex(i=> i._id == e.target.value)

        // Deleting from db
        await axios.delete(baseURL+"/comments/"+ e.target.value )

        // Updating state in React
        this.setState({
            commentsList: [...this.state.commentsList.slice(0, index), ...this.state.commentsList.slice(index + 1)]
        }) 
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <label>
                        Add Comments:
                    </label>
                    <input type="text" name="comments" value={this.state.comments} onChange={this.updateField} />
                </div>
                <div>
                    <label>
                        Username:
                    </label>
                    <input type="text" name="username" value={this.state.username} onChange={this.updateField} />
                </div>
                <div>
                    <label>
                        Recipe name:
                    </label>
                    <input type="text" name="recipe_name" value={this.state.recipe_name} onChange={this.updateField} />
                </div>
                <div>
                    <label>
                        User id:
                    </label>
                    <input type="text" name="user_id" value={this.state.user_id} onChange={this.updateField} />
                </div>
                <div>
                    <label>
                        Recipe id:
                    </label>
                    <input type="text" name="recipe_id" value={this.state.recipe_id} onChange={this.updateField} />
                </div>
                <button onClick={this.add}>Add</button>


                {this.renderCommentsList()}
            </React.Fragment>


        )
    }
}