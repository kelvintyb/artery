# Artery
Heroku link: (https://artery-io.herokuapp.com/)
Art curation app built while exploring the MongoDB/Express/Node stack and routing between Models & Views.
Initially conceptualised as a Tinder/Pinterest for art, and as a base template for C2B/B2B art rentals.

Current Features:
- Users can add paintings to their collection
- Entire database of paintings can be searched via name, category or artist (case-sensitive)
- Users can indicate their preferences by liking a randomly selected painting, this feeds into a user-specific preference score that will be used in a curation feature to be implemented later

## User stories
User A is an artist that wants a direct channel to list his works for rental/sale, to either businesses or individuals that are interested in his style of painting.

User B is a business owner in search of paintings to furnish his new office. He does not have a clear idea of which paintings would fit in the office, so he wants to get a clearer picture of his preferences as well as potential targets for rental through the app.

User C is a casual dabbler in art. He/she wants to browse through a collection of paintings and be able to search for certain artists or art movements that he has heard of, in order to refine his understanding of those paintings.

## Diagrams and Wireframes
Link to ERD
Link to User Flow Diagram
Link to wireframes – Curator View / Portfolio & Search View

## Code Highlights
Refer to WDI6-Code-Highlights.js - this runs through the ajax calls/routes/logic of note for facilitating the user flow, and also the RESTful routes for paintings_api.js

## HURDLES
* Lack of market information/APIs categorised by art preferences (represented by the realist-abstract spectrum)
* Modularisation of routes and logic
* Getting Ajax right, and working with routing in conjunction with ajax refactoring
* Styling

##Areas to work on
1. User interviews to better refine app features
2. UI/styling
3. Refactor into single page app with ajax
4. Refactor manual appending within ajax call to embedded templates within layouts.ejs
5. Full implementation of recommendations pane from data collected through Curator - User's categoryScore property is already being updated from Curator clicks, left with linking that score with dynamic display of appropriate art in the pane

## Known Bugs
1. Ajax switching between portfolio/search tabs on the navbar only work from /portfolio - for any other page, will need to enter urls directly
2. Delete buttons in portfolio page break after submission of paintings due to ajax refresh and the way button code is being populated - refresh the page /portfolio for proper deletion capability
3. User may lose ability to log back in after logging out if the user edited his username/email from /profile

## Technologies used
Express, Mongoose, NodeJS, jQuery/ajax, Bootstrap, sweetAlert
For a full list of dependencies, please refer to package.json.

## Credits
Many thanks go to my wonderful instructors & coursemates from General Assembly Singapore for their help and support.  
