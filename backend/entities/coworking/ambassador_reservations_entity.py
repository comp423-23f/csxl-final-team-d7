"""Entity for Reservations."""

from datetime import datetime

from sqlalchemy import Integer, String, Boolean, ForeignKey, DateTime, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship, Session

from backend.models.coworking.reservation import AmbassadorReservation
from ..entity_base import EntityBase
from ...models.coworking import Reservation, ReservationState
from .room_entity import RoomEntity
from .seat_entity import SeatEntity
from ..user_entity import UserEntity
from typing import Self

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class AmbassadorReservationEntity(EntityBase):
    __tablename__ = "coworking__ambassadorgroupreservation"
    Index("coworking__reservation_time_idx", "group_id", "state", unique=False),

    group_id = mapped_column(String, primary_key=True)

    status = mapped_column(Boolean, nullable=False)

    def to_model(self) -> AmbassadorReservation:
        """Converts the entity to a model.

        Returns:
            Reservation: The model representation of the entity."""
        return AmbassadorReservation(group_id=self.group_id, status=self.status)
