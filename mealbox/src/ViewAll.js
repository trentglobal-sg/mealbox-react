import React from "react"
import axios from "axios"

const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class ViewAll extends React.Component {
    state = {
        recipesList: [],
    }

    async componentDidMount() {
        let response = await axios.get(baseURL + "/recipes");
        this.setState({
            recipesList: response.data
        })
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

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <h1 className="col-12" style={{
                            textAlign: "center"
                        }}>View All
                        </h1>

                        <div className="box col-12 col-md-6 col-lg-4 p-2">
                                <div className="image-container">
                                    <img src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Fettuccine-Carbonara_exps175448_SD143205B01_28_2bC_RMS.jpg" className="test-img"alt="recipe"></img>
                                </div>
                                <div className="des-container mt-2">
                                    <h4>Fettuccini Carbonara</h4>
                                    <p>This carbonara is a delectable, mouth watering pile of yummy goodness. I recommend a nice salad with it - that's all you will need for a complete meal.</p>
                                    <p>By: Sarah J.Pixy</p>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                        </div>
                        <div className="box col-12 col-md-6 col-lg-4 p-2"></div>
                        <div className="box col-12 col-md-6 col-lg-4 p-2"></div>

                    </div>
                    {this.renderList()}
                </div>
            </React.Fragment>
        )
    }
}