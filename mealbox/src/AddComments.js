import React from "react"
import axios from "axios"

const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class AddComments extends React.Component {
    state = {
        comments: []
    }

    // Lifecycle Import
    async componentDidMount() {
        let response = await axios.get(baseURL + "/comments");
        this.setState({
            comments: response.data
        })
    }

    renderCommentsList = () => {
        let list = [];
        for (let l of this.state.comments) {
            list.push(
                <div key={l._id}>
                    <h5>{l.recipe_name}</h5>
                    <p>{l.comments}</p>
                    <p>By: {l.username}</p>
                </div>
            )
        }
        return list
    }

    render() {
        return (
            <React.Fragment>
                {this.renderCommentsList()}
            </React.Fragment>


        )
    }
}