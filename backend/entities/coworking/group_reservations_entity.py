from sqlalchemy import Integer, String, DateTime, ForeignKey, Table, Column
from sqlalchemy.orm import relationship
from ..entity_base import EntityBase

# Define the association table for the many-to-many relationship between groups and users


class GroupReservationsEntity(EntityBase):
    __tablename__ = "group_reservations"
    id = Column(String, primary_key=True)
    when = Column(DateTime)
    what = Column(String)
    # pid list
    # Create the base class for declarative class definitions

    # Define your table as a class
    # Define other columns here
