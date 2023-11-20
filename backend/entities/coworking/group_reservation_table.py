"""Join table between Reservation and Seat entities."""

from sqlalchemy import (
    DateTime,
    PrimaryKeyConstraint,
    String,
    Table,
    Column,
    ForeignKey,
    ARRAY,
)
from sqlalchemy.dialects.postgresql import UUID
from ..entity_base import EntityBase

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

reservation_user_table = Table(
    "coworking__groupreservation",
    EntityBase.metadata,
    Column(
        "group_id",
        UUID(as_uuid=True),
        ForeignKey("coworking__group.id"),  # Update the ForeignKey as needed
        primary_key=True,
    ),
    Column("users", ARRAY(String), nullable=False),
    Column("when", DateTime, nullable=False),
    Column("what", String, nullable=False),
    PrimaryKeyConstraint("coworking__groupreservation.id"),
)
  