import React from "react"
// import axios from "axios"

// const baseURL = "https://3001-bronze-barnacle-pdcp8mf3.ws-us03.gitpod.io"


export default class ViewRecipe extends React.Component {
    state = {
        recipesList: [],
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
        }
    }

    renderTags = () => {
        let list = [];
        for (let l of this.state.tags) {
            list.push(<p className="tags-view">{l}</p>)
        }
        return list
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h1>{this.state.recipe_name}</h1>
                    <div className="tags-wrapper">{this.renderTags()}</div>
        <p>{this.state.description}</p>
                    <p>By: </p>
                    <div className="row">
                        <div className="box col-8">
                            Image
                        </div>
                        <div className="box col-4">
                            Cooking details
                        </div>
                    </div>
                    <div>
                        <h3>Ingredients</h3>
                        <p>Ingredient 1</p>
                        <p>Ingredient 2</p>
                        <p>Ingredient 3</p>
                        <p>Ingredient 4</p>
                    </div>
                    <div>
                        <h3>Directions</h3>
                        <p>Directions 1</p>
                        <p>Directions 2</p>
                        <p>Directions 3</p>
                        <p>Directions 4</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}