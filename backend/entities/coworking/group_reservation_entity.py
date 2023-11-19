"""Entity for Reservations."""

from datetime import datetime

from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship, Session

from backend.models.coworking.reservation import GroupReservation
from ..entity_base import EntityBase
from ...models.coworking import Reservation, ReservationState
from .room_entity import RoomEntity
from .seat_entity import SeatEntity
from ..user_entity import UserEntity
from .reservation_user_table import reservation_user_table
from .reservation_seat_table import reservation_seat_table
from typing import Self

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class GroupReservationEntity(EntityBase):
    __tablename__ = "coworking__groupreservation"
    Index(
        "coworking__reservation_time_idx",
        "group_id",
        "users",
        "when",
        "what",
        unique=False,
    ),

    group_id = mapped_column(String, primary_key=True)
    users = mapped_column(
        String, nullable=False
    )  # Assuming users will be stored as a serialized string
    when = mapped_column(DateTime, nullable=False)
    what = mapped_column(String, nullable=False)

    def to_model(self) -> GroupReservation:
        """Converts the entity to a model.

        Returns:
            Reservation: The model representation of the entity."""
        return GroupReservation(
            group_id=self.group_id,
            users=self.deserialize_users(),
            when=self.when,
            what=self.what,
        )

    def deserialize_users(self):
        """Deserialize the 'users' column."""
        if self.users:
            return self.users.split(
                ","
            )  # Assuming users are stored as a comma-separated string
        return []

    def serialize_users(self, users: list[str]):
        """Serialize the 'users' column."""
        return ",".join(users) if users else ""
