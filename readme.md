# Reactive Frontend Frameworks and RESTful API Development

# **MealBox**
## Context
This project aims to create an interactive web application using React and creating my own RESTful API using Mongo and Express. 

This application serve the following purpose:
* Allow users to search, read and comment on cooking recipes.
* Create and share personal recipe on the website. 
* Purchase all the required ingredients for the recipe. 

User's Goal: To create, search, read and comment on the recipes. To buy necessary required ingredients for the recipe. 

Site owner's goal: To showcase proficiency in the mentioned programming language.


## Access
Url to live site:  https://lively-zabaione-3ad7ee.netlify.app/

![Display sample on different devices upon loading](images/display-sample.png)


# Defining the Project
The purpose of this website is to build a community and allow users to share and follow cooking recipes. 

Many times when we see cooking tutorial online we get intrigued and want to try out the recipe ourselves. 

Mealbox will allow users who wants to recreate the said recipe an option to get all the ingredients delivered in a box. 

There is no need for the user to head down to their local supermarket and search for all the ingredients. 

# Strategy
## Identifying External Users
With the primary purpose mentioned above, the website's primary users are cooking enthusiast. 

Primary users can be further split into two. 

1. Users who are here to read and comment on recipe.
2. Home cooks who are enthusiastic and wish to share their recipe to the community. 

## Identifying External Users' Goals
The users' goal here is to get the neccessary information related to the recipe. 

Therefore, the interface should be simple to understand and easy to interact with.  

```
EUG01. See all recipes.
EUG02. Find out if a recipe exist in the database.
EUG03. See key information of the selected recipes, such as ingredients, directions and cooking time. 
EUG04. Post comments/reviews on the platform. 
EUG05. Create recipe. 
```

## Identifying Users Pain Point
Typical recipe website will only show you the steps and ingredients needed. Users will be required to head down to their nearest mart and find the ingredients required. Often than not, amateur may find it hard to identify the correct ingredient required. 

``` 
UPP01. Finds it hard to locate each individual ingredient. 
``` 

## Identifying Site Owner's Goals
As a start of my journey to become a software developer. My goal as the site owner is to showcase my proficiency in MERN(MongoDB,Express,React,Node).

```
SOG1. Showcase my proficiency in MERN(MongoDB,Express,React,Node).
SOG2. Provide a platform to solve users pain point 
```

## User stories
```
US01. As a user, I want to look at all the recipes, so that I know what are avaiable.
US02. As a user, I want to search for a recipe, so that I know if it exist in the database
US03. As a user, I want to see the details of the recipe, so that I can follow the steps to recreate the dist.
US04. As a user, I want to know buy all the ingredients at a go, so that I can recreate it on my own. 
US05. As a user, I want to comment on a recipe, so that I can share my experience with others. 
```

# Scope
## Functional Requirement
```
FR01. Database to hold all the information.
FR02. User can search base on certain key parameters to check if the recipe exist. 
FR03. User should be able a create recipe.
FR04. Mobile responsive to decides such as Phone, Tablet and Laptop.
FR05. Navigational bar to toggle between pages. 
``` 

## Non-Functional Requirement
```
NFR01. Ensure readability.
NFR02. For security purpose, users private details should not be stored.
```

## Content Requirement
### Mandatory Requirement
The list below contains the mandatory requirement for the site to meet all of the users goals (EUG01-05).

```
CRM01. Simple layout for overview of all recipe. (EUG01)
CRM02. Search Filter. (EUG02)
CRM03. Information Table. (Static Data, such as Ingredients, Directions, Cooking Time, Serving Size) (EUG03)
CRM04. Comment Section on the individual recipe. (Reviewer Name and Comments.) (EUG04)
CRM05. Tab to create reciepe which will then be stored in DB. (EUG05)
```

### Optional Requirement
The list below are optional requirements that can be implemented to enhance the site's feature. 

They may not be implemented due to various reasons. (Eg, authorisation, access to system/domains)

```
CRO01. Store individual account/user's preference.
CRO02. Purchase ingredients from their nearby supermarkets. 
CRO03. Make payment. 
``` 

# Structure
## Content Information
Information that are required to fulfil the mandatory content requirement.

Some information will be shared across different pages.

### Information required on the overview of all recipe. 
```
SCI01. Name of Recipe.
SCI02. Name of the creator.
SCI03. Short Description of Recipe.
SCI04. Tags associated to the Recipe.
SCI05. Image of the Recipe. 
```

### Information required on the individual recipe. 
```
SCI06. Cooking time required.
SCI07. Preparation time required.
SCI08. Serving Size.
SCI09. Difficulty.
SCI10. Cuisine Type.
SCI11. Ingredients.
SCI12. Directions.
SCI13. Reviewer name.
SCI14. Reviewer comments.
```

### Information required on the create recipe page
Information required is the same as individual recipe page. 


## Content Structure
The content structure of this page will follow a **LINEAR STRUCTURE**.

Home Page > Individual Recipe Page
Home Page > Create Recipe Page


![Content Structure Image](images/content-structure.png)
1. Home Page:
    * The page will only have a few section that contains the hero image, search filter and showing of the recipes.  
    * When there is no search, database will show all recipes. 
    * Search filter contain the following. 
        1) Search by recipe name. (Case insensitive)
        2) By cuisine type. 
        3) By difficulty. 
    * The page should allow the users to select an recipe and read up on it's detail. 

2. Individual Recipe Page: 
    * The page will present all data associated with the recipe.  
    * Comment section to allow user to share reviews with others. 

3. Create Recipe Page: 
    * The page will require user to insert all data associated with the recipe. 
    * Image should be stored as a URL.  


# Skeleton
## Interface Design
All page should adopt a similar design for harmony in design. 

## Home Page
This page will focus search and display of the recipe. 

![Skeleton Design for Home Page](images/skeleton-home.png)

## Individual Recipe Page
This page will focus on showing all the relevant information of the recipe. 

![Skeleton Design for Individual Recipe Page](images/skeleton-individual.png)

## Create Recipe Page
This page will gather input relevant information of the recipe from the user. 

![Skeleton Design for Individual Recipe Page](images/skeleton-create.png)

## Site Map

![Site Map](images/site-map.png)

## Navigation
Navigation between sites can be done by using the nav bar provided. 

# Surface
## Color
On the Home Page, I have decided to use a repeating image that consist of food as icons for the background. 

Nav bar and cards are kept to white for easy contrast and readability. 

Orange is the main color used because it is considered an energetic color. It calls the mind to feel excitement, enthusiasm, and warmth. 

You will see various other colors used to identify the tags associated with the recipe. 


## Fonts
[Ma Shan Zheng](https://fonts.google.com/specimen/Ma+Shan+Zheng?preview.text_type=custom#about) font are used for the Brand as it is gives a heavy and majestic, vital and expansive feel. 

[Roboto Slab](https://fonts.google.com/specimen/Roboto+Slab?preview.text_type=custom#glyphs) font are used to inherit all of the body text in the webpage. 

The font has a dual nature. The form are largely geometric and features friendly and open curves. Allowing letters to be settled into their natural width making reading rhythm more harmonise. 

## Features

## Content
The webpage contains all the neccessary information the user needs. Compiled and tabulated in a simple and easy to read manner.

## Responsiveness
The webpage is responsive across various devices from desktop and laptop to phones and tablets. The component will automatically re-arrange itself based on the screen size.

Reccommended view tablets is in landscape mode. 

# Testing
## Functionality Test
## Home Page
|Category |Input/Actions | Output/Errors |
|---------|-----------------------------|---------------------|
|Overall | Mobile Responsive Check| No display error|
|Nav Bar| On load | Display Logo Typography, "Home", "Create" and pseudo signin button|
| | Clicking on "Home"| Refreshes the page|
| | Clicking on "Create" | Redirects to "Create Recipe Page"|
| | Click on "Sign In" |Will trigger a conditional rendering, making editing and deleting of recipe possible. "Sign In" will change to "Log Out"| 
| | Click on "Log Out" |Will trigger a conditional rendering, removing editing and deleting of recipe. "Log Out" will change to "Sign In"
| Search Filter| Typing into "Search Recipe" | The space will capture what the user type. Page will not change until "Search" is clicked. 
| | Selecting "Cuisine Type" | The drop-down will change to the selected cuisine type. Page will not change until "Search" is clicked. |
| | Selecting "Difficulty" | The drop-down will change to the selected difficulty. Page will not change until "Search" is clicked.|
| | Clicking on "Search" btn| Will show results based on search filter. Will dispaly 0 recipe if nothing is found.|
| | Clicking on "Reset" btn | Will reset all search fields and show all recipes.|
|Recipes | Clicking on Title of recipe | Will be redirected into the selected recipe page.|
| | Clicking on "Edit" btn | Will be redirected into the selected recipe editing page.|
| | Clicking on "Delete" btn | System will delete the recipe from page and DB.|


## Individual Recipe Page
|Category |Input/Actions | Output/Errors |
|---------|-----------------------------|---------------------|
|Overall | Mobile Responsive Check| No display error|
|Page Function| On load | Load information for the individual recipe and its comment. |
|Nav Bar| On load | Display Logo Typography, "Home", "Create" and pseudo signin button|
| | Clicking "Home"| Redirect back to Home page|
| | Clicking "Create" | Redirects to "Create Recipe Page"|
| | Clicking "Sign In" |Will trigger a conditional rendering, making editing and deleting of comments possible. "Sign In" will change to "Log Out"| 
| | Clicking "Log Out" |Will trigger a conditional rendering, removing editing and deleting of comments. "Log Out" will change to "Sign In"
|Reviews | Input on text field| Will display user input.|
| | Clicking "Create"| Comment will be created and display below. Input will be reset. |
||Clicking "Edit" | Values of comment will be automatically loaded into space. "Submit"  and " Cancel"  button will show instead of "Create" |
|| Clicking "Submit"| New values of comment will be shown. "Create" button will replace "Submit" and "Cancel"|
|| Clicking "Cancel"|  No values will be changed. "Create" button will replace "Submit" and "Cancel"|


## Create/Edit Recipe Page
|Category |Input/Actions | Output/Errors |
|---------|-----------------------------|---------------------|
|Overall | Mobile Responsive Check| No display error|
|Page Function| On load - from edit | Load information for the individual recipe.  |
|Nav Bar| On load | Display Logo Typography, "Home", "Create" and pseudo signin button|
| | Clicking "Home"| Redirect back to Home page|
| | Clicking "Create" | No output |
| | Clicking  "Sign In" | No output. "Sign In" will change to "Log Out"| 
| | Clicking "Log Out" | No output. "Log Out" will change to "Sign In"|
| | Input into fields | Will display user input|
| | Clicking "Create" | Recipe will be created and redirect to Home|
| | Editing - Clicking "Submit" | New values will be captured and redirect to Home|
| | Clicking "Cancel" | Redirect to Home| 


## Validating Markup
All pages validated by validating service  [W3C Markup Validator](https://validator.w3.org/).
```
Document checking completed. No errors or warnings to show.
```

# Deployment
Ensured all changes has been save and pushed to GitHub.

If you would like to deploy or fork this application you can visit https://github.com/yongsannnn/mealbox-react.  There is only one branch to this application. 

MealBox is deployed to Netlify. All icons and images used in the project are stored together.  

Data sets are store in Heroku and are called automatically. It may take up to thirty seconds for data set to be loaded. 

Apart from React default package. Ensure you have the following depencencies. 
```
axios
bootstrap
react-router-dom
```

## Heroku 

Step 1| Login to Heroku.

At the terminal, log in to heroku with `heroku login -i`. Enter your username and password. 

Step2| Create the Heroku App

Once you have logged in, create a new Heroku app with the following commands at the terminal:

`heroku create <app-name>`

Replace `<app-name>` with a name of your choice. Do not use underscore. As the app name has to be unique, make sure the name you use is distinctive. You can use your initials as part of the app name, for instance.

Step 3| Define Procfile

Create one in the same directory as index.js and name it as `Procfile`

Add the following line to the Procfile:
```
web: node index.js
```

Step 4| Add a start script to package.json

```
{...,
"scripts": {
    "start": "node index.js"
  }
}
```

Step 5| Change the port that we are using

Change app.listen to `process.env.PORT`

Step 6| Push to Heroku
```
git push heroku master
```

Step 7| Setup the config variables

Go to Heroku and look for the app you just deployed. Then click on Settings:

Next, click on Reveal Config Vars:

After which, add in MONGO_URL, and the connection URL from your .env file:

Step 8| Run the app

From your Heroku project panel, click on the button that says Open App. Test if your app is working.

Credits: Mr Paul Chor

## Netlify

Step 1| Run build

Run the following command in your react terminal. Ensure you are in index.js directory 
```
npm run build
```

Step 2| Download to local file

After the build command completes, look for the folder `build` right click and download it.

Extract it as a folder in your local computer. 

Step 3| Deployment

Login to Netlify, click on "Sites" and drag the folder into the space. 



# Technologies
In this application JSX is used to structure the content, CSS3 and Bootstrap for styling and JavaScript to process data.

Gitpod is used as the main coding platform. 

By using Bootstrap 4, mobile responsive design is made easier with the row-col system. 

To demostrate proficiency, I have used CSS to create mobile responsive codes with media query and flexbox.

Several other tools that played a role in this application:

For API,
* [Axios](https://github.com/axios/axios)

For styling,
* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

For deployment,
* [Github](https://github.com/)
* [Heroku](https://www.heroku.com/)
* [Netlify](https://netlify.app/)

For icons,
* [Flaticon](https://www.flaticon.com/)
* [FontAwesome](https://fontawesome.com/)

For background-image,
* [Toptal](https://www.toptal.com/designers/subtlepatterns/)

For validating markup,
* [W3 Markup Validation Service](http://validator.w3.org/)

# Acknowledgments
* Mr Paul Chor - For all the countless suggestions and help
* Mr Ace Liang - For sharing layout and CSS Tips
* Mr Benjamin Png - For your continuous assitance and brainstorming of ideas  