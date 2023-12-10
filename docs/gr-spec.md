Authors:

Ferras Dahnoun: https://github.com/fdahnoun

Ali Jawad: https://github.com/AliJawad06

Sadiya Noor: https://github.com/SadiyaNoor

Emaan Tauseef: https://github.com/etauseef730

# Get Started with Group Reservation Feature!

## Models Used: GroupReservation and AmbassadorReservation

Here are the two main models that are utilized for our group reservation feature:
class GroupReservation(BaseModel):
group_id: str = ""
users: list[str] = []
when: datetime | None = None
what: str = ""

class AmbassadorReservation(BaseModel):
group_id: str = ""
status: bool = False

The GroupReservation model is specifically designated for setting up a data representation that contains the group id of the newly generated group, the associated strings of PID's of people in the group, when the reservation is being made, and what kind of table is being reserved. Secondly, the AmbassadorReservation model stores the the group id string and the status of whether it is checked in or not. Once a reservation is made,the AmbassadorReservation model receives the necessary data to checkin and checkout a group.

We also have implemented multiple API Routes, including POST requests for both reservations and Checkins, GET requests for obtaining a reservation and displaying it on the checkin component page, DELETE requests for deleting a reservation, and PUT requests for updating a status of a checkin.

## Description of Underlying Database/Entity-Level Representation Decisions:

In our entity/database level, we added two new entities and two new tables, one for reservations and one for a status of checked in groups within the lab. Whenever a group id is generated with a list of users, it gets stored in the reservation table in database. Additionally, when a reservation is made, the group id and a 'false' status will be added to the check in table, but when a user checks in, the check in status will change from 'false' to 'true'.

## Technical and UX Design Choices:

Another idea we had for the group reservation was to provide the user who just made the reservation after confirmation to just add users to their confirmed reservation, but we ended up choosing our group id method reservation so we can then look up the group simply by passing in the group id. In terms of a user experience (UX) design choice, we decided to assimilate with the current format of the website and use the same fonts, coloring, bordering, and overall style. We thought about creating our own custom design, but thought it would be more beneficial to proceed with the current design.

## Feature Intro and Brief Tour:

The group reservation feature allows users to add at least two UNC faculty or student to be added to a group. They will then be given a unique group id that they can then use to check in to the CSXL lab!

As you are getting started with learning more about the group reservation feature, you can look through the reservation files within the coworking module in both the backend and the frontend. In here is plenty of information on the backend services that will call specific API routes to then initiate HTTP requests to the server. There are also model folders so you can create new interfaces or objects that you will need to utilize throughout your project. In terms of the front end, there are components that contain widgets for making a reservation and observing the existing reservations. These exist within the make-reservation and group-checkin folders. Additionally, we have reported 100% test coverage for all the backend services.

## Image Flow of Group Project Feature:

![Choose Reservation](https://github.com/unc-csxl/csxl.unc.edu/blob/main/docs/images/org-page.png)

![Make Reservation:](https://github.com/unc-csxl/csxl.unc.edu/blob/main/docs/images/enter_group.png)

![View Group](https://github.com/unc-csxl/csxl.unc.edu/blob/main/docs/images/added_group.png)

![Confirmation Page](https://github.com/unc-csxl/csxl.unc.edu/blob/main/docs/images/confirmation_page.png)

![Active Group Reservation](https://github.com/unc-csxl/csxl.unc.edu/blob/main/docs/images/active_group_reservation.png)

![Ambassador Page](https://github.com/unc-csxl/csxl.unc.edu/blob/main/docs/images/ambassador_page.png)

![Ambassador Checkout Page](https://github.com/unc-csxl/csxl.unc.edu/blob/main/docs/images/checkout_ambassador_page.png)
