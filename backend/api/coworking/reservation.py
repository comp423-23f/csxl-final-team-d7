"""Coworking Client Reservation API

This API is used to make and manage reservations."""

from fastapi import APIRouter, Depends, HTTPException

from backend.models.coworking.reservation import GroupReservation
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
    return reservation_svc.draft_group_reservation(request)



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


@api.put("/reservation/{id}", tags=["Coworking"])
def update_reservation(
    reservation: ReservationPartial,
    subject: User = Depends(registered_user),
    reservation_svc: ReservationService = Depends(),
) -> Reservation:
    """Modify a reservation."""
    return reservation_svc.change_reservation(subject, reservation)


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

@api.delete("/groupreservation/{groupid}", tags=["Coworking"])
def cancel_groupreservation(
    groupid: int,
    subject: User = Depends(registered_user),
    reservation_svc: ReservationService = Depends(),
) -> Reservation:
    """Cancel theb group reservation."""
    return reservation_svc.change_reservation(
        subject, ReservationPartial(id=groupid, state=ReservationState.CANCELLED)
    )