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
                <div className="box col-12 p-2 mt-2">
                    <div className="image-container col-12 col-md-4">
                        <img src={l.resource.img_url} className="test-img" alt="recipe"></img>
                    </div>
                    <div className="des-container col-12 col-md-8 mt-2">
                        <h4>{l.recipe_name}</h4>
                        <p>{l.description}</p>
                        <p>By: {l.created_by}</p>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
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

                        {/* <div className="box col-12 p-2">
                            <div className="image-container col-4">
                                <img src="https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Fettuccine-Carbonara_exps175448_SD143205B01_28_2bC_RMS.jpg" className="test-img" alt="recipe"></img>
                            </div>
                            <div className="des-container col-8 mt-2">
                                <h4>Fettuccini Carbonara</h4>
                                <p>This carbonara is a delectable, mouth watering pile of yummy goodness. I recommend a nice salad with it - that's all you will need for a complete meal.</p>
                                <p>By: Sarah J.Pixy</p>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                        <div className="box col-12 col-md-6 col-lg-4 p-2"></div>
                        <div className="box col-12 col-md-6 col-lg-4 p-2"></div> */}

                    </div>
                    {this.renderList()}
                </div>
            </React.Fragment>
        )
    }
}