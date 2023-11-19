"""Join table between Reservation and Seat entities."""

from sqlalchemy import (
    DateTime,
    PrimaryKeyConstraint,
    String,
    Table,
    Column,
    ForeignKey,
    ARRAY,
    Boolean,
)
from sqlalchemy.dialects.postgresql import UUID
from ..entity_base import EntityBase

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

Ambassador_reservation_table = Table(
    "coworking__ambassadorgroupreservation",
    EntityBase.metadata,
    Column(
        "group_id",
        UUID(as_uuid=True),
        ForeignKey("coworking__group.id"),  # Update the ForeignKey as needed
        primary_key=True,
    ),
    Column("status", Boolean, nullable=False),
    PrimaryKeyConstraint("coworking__ambassadorgroupreservation.id"),
    extend_existing=True,
)
