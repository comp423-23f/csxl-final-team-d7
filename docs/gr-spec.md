1. Here are two new models that we created within this sprint.
   class GroupReservation(BaseModel):
   group_id: str = ""
   users: list[str] = []
   when: datetime | None = None
   what: str = ""

class AmbassadorReservation(BaseModel):
group_id: str = ""
status: bool = False

both of these are used to store data about the reservation and the status of a groups checkin.

We also have implemented multiple API Routes, including POST requests for both reservations and Checkins, GET requests for obtaining a reservation and displaying it on the checkin component page, DELETE requests for deleting a reservation, and PUT requests for updating a status of a checkin. 2. In our entity/database level, we added two new entities and two new tables, one for reservations and one for a status of checked in groups within the lab. Whenever a group id is generated with a list of users, it gets stored in the reservation table in database, while when a user checks in, it gets stored in the ambassador checkin table database.

3. Another idea we had for the group reservation was to provide the user who just made the reservation after confirmation to just add users to their confirmed reservation, but we ended up choosing our group id method reservation so we can then look up the group simply by using the getting the list of users by Group Id.

4. A new developer can get started with our feature can look through the reservation files within the coworking module in both the backend and the frontend. In here is likely the best way that a new developer can start on the group reservation feature. There are also model folders so you can create new interfaces or objects that you will need to utilize throughout your project.
