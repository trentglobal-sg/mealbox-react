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

    }

    // Lifecycle Import
    async componentDidMount() {
        let response = await axios.get(baseURL + "/comments");
        this.setState({
            commentsList: response.data
        })
    }

    renderCommentsList = () => {
        let list = [];
        for (let l of this.state.commentsList) {
            list.push(
                <div key={l._id}>
                    <h5>{l.recipe_name}</h5>
                    <p>ID:{l.recipe_id}</p>
                    <p>{l.comments}</p>
                    <p>By: {l.username}</p>
                </div>
            )
        }
        return list
    }

    updateField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    add = (e) => {
        // let newComment = {

        // }
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
                <button onClick={this.state.add}>Add</button>


                {this.renderCommentsList()}
            </React.Fragment>


        )
    }
}