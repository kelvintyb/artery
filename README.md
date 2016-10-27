ctrl-shift-3 for screenshot
# Artery
Link to the app(https://artery-io.herokuapp.com/ Link to the main app)

A couple paragraphs about the general approach you took

## User stories
Link to your user stories – who are your users, what do they want, and why?

## Diagrams and Wireframes
Link to your diagrams – ER and user flow diagram
Link to your wireframes – sketches of major views / interfaces in your application

## HURDLES
* Modularisation of routes and logic
* Getting Ajax right, and working with routing in conjunction with ajax refactoring
* Styling

##Areas to work on
1. UI/styling
2. Refactor into single page app with ajax
3. Refactor manual appending within ajax call to embedded templates within layouts.ejs
4. Full implementation of recommendations pane from data collected through Curator - User's categoryScore property is already being updated from Curator clicks, left with linking that score with dynamic display of appropriate art in the pane

## Known Bugs
1. Ajax switching between portfolio/search tabs on the navbar only work from /portfolio - for any other page, will need to enter urls directly
2. Delete buttons in portfolio page break after submission of paintings due to ajax refresh and the way button code is being populated - refresh the page /portfolio for proper deletion capability
3. User may lose ability to log back in after logging out if the user edited his username/email from /profile

## Technologies used
jQuery/ajax, Bootstrap, sweetAlert, Express, Mongoose
For a full list of dependencies, please refer to package.json.
