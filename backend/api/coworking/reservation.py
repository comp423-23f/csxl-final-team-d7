"""Coworking Client Reservation API

This API is used to make and manage reservations."""

from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from backend.models.coworking.reservation import GroupReservation, AmbassadorReservation
from backend.entities.coworking import AmbassadorReservationEntity
from ..authentication import registered_user
from ...services.coworking.reservation import ReservationService
from ...models import User
from ...models.coworking import (
    Reservation,
    ReservationRequest,
    ReservationPartial,
    ReservationState,
)

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


api = APIRouter(prefix="/api/coworking")
openapi_tags = {
    "name": "Coworking",
    "description": "Coworking reservations, status, and XL Ambassador functionality.",
}


@api.post("/reservation", tags=["Coworking"])
def draft_reservation(
    reservation_request: ReservationRequest,
    subject: User = Depends(registered_user),
    reservation_svc: ReservationService = Depends(),
) -> Reservation:
    """Draft a reservation request."""
    return reservation_svc.draft_reservation(subject, reservation_request)


@api.post("/group_reservation", tags=["Coworking"])
def draft_group_reservation(
    request: GroupReservation,
    reservation_svc: ReservationService = Depends(),
) -> GroupReservation:
    """Draft a reservation request."""
    print("MADE IT IN API LAYER")
    print("Received request", request.model_dump())
    return reservation_svc.draft_group_reservation(request)


@api.post("/ambassador_group_reservation", tags=["Coworking"])
def draft_ambassador_group_reservation(
    request: AmbassadorReservation,
    reservation_svc: ReservationService = Depends(),
) -> AmbassadorReservation:
    """Draft a reservation request."""
    print("MADE IT Ambassador LAYER")
    print("Received request", request.model_dump())
    return reservation_svc.draft_ambassador_group_reservation(request)


@api.get("/reservation/{id}", tags=["Coworking"])
def get_reservation(
    id: int,
    subject: User = Depends(registered_user),
    reservation_svc: ReservationService = Depends(),
) -> Reservation:
    return reservation_svc.get_reservation(subject, id)


@api.get("/get_group_reservation", tags=["Coworking"])
def get_group_reservation(
    groupId: str,
    reservation_svc: ReservationService = Depends(),
) -> GroupReservation:
    return reservation_svc.get_group_reservation(groupId)


@api.get("/get_ambass_group_reservations", tags=["Coworking"])
def get_ambass_group_reservations(
    reservation_svc: ReservationService = Depends(),
) -> List[AmbassadorReservation]:
    return reservation_svc.get_ambass_group_reservations()


@api.put("/reservation/{id}", tags=["Coworking"])
def update_reservation(
    reservation: ReservationPartial,
    subject: User = Depends(registered_user),
    reservation_svc: ReservationService = Depends(),
) -> Reservation:
    """Modify a reservation."""
    return reservation_svc.change_reservation(subject, reservation)


@api.put("/ambass_group_reservation/{group_id}", tags=["Coworking"])
def update_ambassador_group_reservation(
    group_id: str,
    new_ambass_group: AmbassadorReservation,  # Assuming AmbassadorGroupReservation is a Pydantic model
    ambass_group_svc: ReservationService = Depends(),
) -> AmbassadorReservation:
    """Modify an ambassador group reservation."""
    return ambass_group_svc.update_ambassador_group_reservation(
        group_id, new_ambass_group
    )


@api.delete("/reservation/{id}", tags=["Coworking"])
def cancel_reservation(
    id: int,
    subject: User = Depends(registered_user),
    reservation_svc: ReservationService = Depends(),
) -> Reservation:
    """Cancel a reservation."""
    return reservation_svc.change_reservation(
        subject, ReservationPartial(id=id, state=ReservationState.CANCELLED)
    )


@api.delete("/delete_groupreservation", tags=["Coworking"])
def cancel_groupreservation(
    groupid: str,
    reservation_svc: ReservationService = Depends(),
):
    """Cancel the group reservation."""
    reservation_svc.delete_group_reservation(groupid)
