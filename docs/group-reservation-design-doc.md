# Group Reservation Design Document

# Technical Implementation Opportunities and Planning

https://www.figma.com/file/2YGlDIRTurVCfIfJo8V0qG/Group-Reservations-App?type=design&node-id=0%3A1&mode=design&t=OKPkXv7EvJxKw5co-1

What specific areas of the existing code base will you directly depend upon, extend, or integrate with?
Frontend:
Within the frontend, we will work with app directory of the project, specifically within the app-routing.module.ts to move to a group reservation page, the app.module file to create any necessary components into the declarations of @NgModule, most likely the even-card.widget component to handle any clicked events on a card.
We would also probably need to take use of the Profile class in order to retrieve user profiles that are registered within the system.
We would also most likely need to depend upon the reservation component and service classes in our relation to creating group reservations.
The ambassador home folder also needs to have an option to create group reservations AND view group reservations that currently exist.
Backend:
Within the backend, we definitely will need to integrate with the existing api’s to add our new endpoints for creating, deleting, updating, and getting data for our upcoming group reservation.
We will also need access to the database to ensure that all the data remains saved and stored in a safe place where it can then be accessed later for future use.
We will also use the routes that are pertaining to specific api values.
We are going to add a new route file that adds all of the routes pertaining to teams that are mentioned below.
What planned page components and widgets, per the assigned reading, do you anticipate needing in your feature’s frontend?
We can have a widget that contains a table of all the group reservations that are currently in process on a component page that is specifically for group reservations.
We would have another widget that is a table that withholds all the existing teams
We would have a widget for searching for teams just ike we search for single reservations.
We would have widget for profile
What additional models, or changes to existing models, do you foresee needing (if any)?
We want to add a model for a team.
Considering your most-frequently used and critical user stories, what API / Routes do you foresee modifying or needing to add?
The Routes I foresee adding is a post route that creates a team and returns a unique team ID that can be used upon subsequent reservations from the same team. We also can have a delete team and delete team member route and update team member and update team routes for when teams need to be deleted or changed.
I also foresee adding a get route that returns all of the reservations and their details and a delete route that can delete reservations
There also should be a get route that returns a specific team given a unique team ID.
What concerns exist for security and privacy of data? Should the capabilities you are implementing be specific to only certaain users or roles? (For example: When Sally Student makes a reservation, only Sally Student or Amy Ambassador should be able to cancel the reservation. Another student, such as Sam Student, should not be able to cancel Sally’s reservation.)
Only ambassadors should have access to all registrations.
Only ambassadors should have access to delete reservations
Ambassadors should not be able to alter any reservations.
Ambassador should not access team information, only reservation information.


