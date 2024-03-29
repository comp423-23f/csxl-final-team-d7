# 0. Group Reservation Design Document // Team D7

Overview: When working on a group project for any of your classes, it can be a hassle to have to make every single person on the team reserve their own seat. This can also be an issue where you might not be able to get the seat that you want next to your team in the lab. However, the main aspect of this feature is to allow only one member from your team to be able to make a group reservation so that when an ambassador checks you in to the system, all of the members on the team will appear on the confirmation page. Additionally, the entire team can sit together without having to worry about losing their seat among their team during the reservation process.

Key Personas: As Sadiya Student, I would like to be able to have the ability of adding my team memebrs to a drop-in reservation's confirmation page so my other team members do not have to redundantly spend their time reserving a spot. Instead, I can carry out the reservation for the whole team myself. Ali Ambassador should have the capability through her service to check us all in as a group. Also, I need to be able to make sure that there are enough seats for a specific seat type within the lab to put in the group reservation and if there is not enough space, I should be declined access to make a reservation for the entire group. Mariam Manager should be able to see all the registered students.

STORIES:
Sadiya Student should be able to check in her friends when she is also checking in, once she is done there will be a group ID that is returned.

Sadiya Student should be able to check her self in along with selecting the amount of group members she wants to check in with her.

Ali Ambassador should be able to see under the check-in users a list of checked-in students registered with Sally Student.

Mariam Manager should be able to see all registered students.

If Sadiya Student's friend is not registered, an error shows up during check-in, taking her to the registration page allowing her to register her friend.

Wireframes / Mockups: Figma Link for Group Res. Project- https://tinyurl.com/dv4xnc88

# Technical Implementation Opportunities and Planning

What specific areas of the existing code base will you directly depend upon, extend, or integrate with?
Frontend:
Within the frontend, we will work with app directory of the project, specifically within the app-routing.module.ts to move to a group reservation page, the app.module file to create any necessary components into the declarations of @NgModule, most likely the even-card.widget component to handle any clicked events on a card.
We would also probably need to take use of the Profile class in order to retrieve user profiles that are registered within the system.
We would also most likely need to depend upon the reservation component and service classes in our relation to creating group reservations.
The ambassador home component also needs to view group reservations that currently exist.

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



