# planEats
Planning meals with your family and friends

# Team
- __Product Owner__: Tre Ammatuna
- __Scrum Master__: Brittany Starr
- __Development Team Members__: Andrew Chung, Jordan Mason

## Table of Contents
1. [Team](#team)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
Login:
- Users must first login by creating an account or with Google or Facebook

First time:
- First-time users can follow the first-time link to navigate to the `About Us` page, which explains each page of the website 

Creating a recipe:
- Users can create a recipe by navigating to the `Recipes` page and clicking `Create a Recipe`
- Enter a recipe name, ingredients, prep time, cook time and instructions, add an image if available, then click `Submit` to save the recipe to your recipe book

Searching for a recipe:
- Search for a recipe by navigating to the `Search` page and entering a common language query for the recipe or type of recipe you're looking for
- When you find the recipe you like you can either add it to your recipe book by clicking `Add to Recipe Book` or you can see a brief summary of the recipe by clicking `More Info` and later add it to your recipe book from the ensuing popup

Creating a meal:
- Create a meal by navigating to the `Meals` page
- Enter a meal name then select the recipes you want to include from your recipe book in the drop-down menu below
- Select `Save Meal` to save your meal to the database

Plan a meal:
- To plan a meal, navigate to the `Plans` page, where you'll see your planEats calendar
- Click the day you wish to plan a meal, then select the meal you'd like to eat that day from the drop-down menu and click `Select Meal Time`
- Select the time you wish to eat that meal from the drop-down menu, and click `Lovely!` to add it to your planEats calendar

Adding a meal to your Google Calendar:
- If you'd like to add a meal to your Google Calendar, simply follow the steps listed in `Plan a meal`, but after you've selected a time for your meal, select `Add to Google Calendar` instead of `Lovely!` and the meal will be added to your planEats and Google Calendars

To view, edit or remove a planned meal from your planEats calendar:
- To view a planned meal on your planEats calendar, click the meal on the calendar and the name of the meal and its time will display in a popup
- To remove that meal from your calendar, click on the meal and select `Delete Meal` and it will no longer display on your calendar
- To edit a planned meal, click on the meal and select `Edit Meal` then select a different meal and/or time and the updated meal plan will appear on your calendar

Planning a shopping list:
- To view a shopping list for ingredients from your meal plan, navigate to the `Shop` page
- Select a start and end date for the time period of planned meals you'll be shopping for, and the ingredients for those meals will automatically populate your shopping list
- To add additional items to your list, enter the item in the input below and click the `+` button to add to your shopping list

Cooking a meal:
- To view cooking instructions for your next meal, navigate to the `Cook` page, where you'll see the step by step directions for how to cook the next planned meal on your calendar

To search delivery options:
- To search takeout options, click the `No Time?` button in the navigation bar on any page
- Enter a full address or simply a zip code and click `Search` to pull up a list of nearby restaurants that deliver
- To place an order and more, go directly to the restaurant's page on the takeout website EatStreet by clicking `View on EatStreet~`

## Requirements

- Auth0 Lock: 10.7.3
- Babel-Cli: 6.18.0
- BodyParser: 1.15.2
- Convert-units: 1.3.1
- Curlrequest: 1.0.1
- Dotenv: 2.0.0
- Events: 1.1.1
- Express: 4.14.0
- Express-CORS: 0.0.3
- Express-JWT: 5.1.0
- Flexbox-React: 4.1.1
- FontAwesome: 4.7.0
- FullCalendar: 3.1.0
- GoogleAPIs: 16.0.0
- Helmet: 3.3.0
- JWT-Decode: 2.1.0
- Material-UI: 0.16.6
- Moment: 2.17.1
- Moment-Range: 3.0.0
- Nodemon: 1.11.0
- PG: 6.1.2
- PG-Hstore: 2.3.2
- React: 15.4.1
- React-Addons-Shallow-Compare: 15.4.1
- React-Bootstrap: 0.30.7
- React-Bootstrap-Daterangepicker: 3.2.2
- React-Bootstrap-Time-Picker: 1.0.1
- React-Dates: 4.3.0
- React-DOM: 15.4.1
- React-Dropzone: 3.9.0
- React-Fontawesome: 1.5.0
- React-Router: 3.0.0
- React-Select: 1.0.0
- React-Tap-Event-Plugin: 2.0.1
- Sequelize: 3.28.0
- Superagent: 3.3.2
- SweetAlert-React: 0.4.6
- SweetAlert2: 6.3.0
- Unirest: 0.5.1
- Visible-React: 0.0.8

## Development
To run in development mode:
- Navigate to client directory
- Run `npm install`
- Navigate to server directory
- Run `npm install`
- Navigate to root directory
- Run `node server/server.js`
In this mode, Webpack runs the client and server scripts concurrently. Changes to client-side files trigger a browser refresh while changes to server-side files trigger a Webpack refresh.

For testing:
- Navigate to server directory
- Run `npm test`
