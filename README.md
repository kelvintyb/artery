ctrl-shift-3 for screenshot
#Artery


A link to your hosted working app in the URL section of your GitHub repo

A couple paragraphs about the general approach you took



Link to your user stories – who are your users, what do they want, and why?

Link to your wireframes – sketches of major views / interfaces in your application


Link to your diagrams – ER and user flow diagram

Descriptions of any unsolved problems or major hurdles your team had to overcome


##HURDLES
Modularisation of routes and logic

Recommendations pane  

Getting Ajax right, and working with plain routes in conjunction with ajax refactoring

##Known Bugs
1. Ajax switching between portfolio/search tabs on the navbar only work from /portfolio - for any other page, will need to enter urls directly
2. Delete buttons in portfolio page break after submission of paintings due to ajax refresh and the way button code is being populated - refresh the page /portfolio for proper deletion capability
3. User may lose ability to log back in after logging out if the user edited his username/email from /profile

##Areas to work on
1. UI/styling
2. Refactor into single page app with ajax
3. Refactor manual appending within ajax call to embedded templates within layouts.ejs

##Technologies used
jQuery/ajax, Bootstrap, sweetAlert, Express, Mongoose
For a full list of dependencies, please refer to package.json.

##
