"""ReservationService#get_seat_reservations tests."""

from unittest.mock import create_autospec, call

from backend.models.coworking.reservation import AmbassadorReservation, GroupReservation

from .....services.coworking import ReservationService
from .....services import PermissionService
from .....models.coworking import Reservation
from .....services.exceptions import ResourceNotFoundException, UserPermissionException

# Imported fixtures provide dependencies injected for the tests as parameters.
# Dependent fixtures (seat_svc) are required to be imported in the testing module.
from ..fixtures import (
    reservation_svc,
    permission_svc,
    seat_svc,
    policy_svc,
    operating_hours_svc,
)
from ..time import *

# Import the setup_teardown fixture explicitly to load entities in database.
# The order in which these fixtures run is dependent on their imported alias.
# Since there are relationship dependencies between the entities, order matters.
from ...core_data import setup_insert_data_fixture as insert_order_0
from ..operating_hours_data import fake_data_fixture as insert_order_1
from ..room_data import fake_data_fixture as insert_order_2
from ..seat_data import fake_data_fixture as insert_order_3
from .reservation_data import fake_data_fixture as insert_order_4

# Import the fake model data in a namespace for test assertions
from ...core_data import user_data
from .. import seat_data
from . import reservation_data

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


def test_get_reservation(
    reservation_svc: ReservationService,
):
    """Get an existing reservation as a user party to the reservation."""
    reservation: Reservation = reservation_svc.get_reservation(
        user_data.user, reservation_data.reservation_1.id
    )
    assert reservation.id == reservation_data.reservation_1.id
    assert reservation.start == reservation_data.reservation_1.start
    assert user_data.user.id in [u.id for u in reservation.users]


def test_get_non_existent_reservation(
    reservation_svc: ReservationService,
):
    """Get an existing reservation as a user party to the reservation."""
    with pytest.raises(ResourceNotFoundException):
        NONEXISTENT_ID = 423
        reservation: Reservation = reservation_svc.get_reservation(
            user_data.user, NONEXISTENT_ID
        )


def test_get_reservation_enforces_permissions(reservation_svc: ReservationService):
    permission_svc = create_autospec(PermissionService)
    permission_svc.check.return_value = False
    reservation_svc._permission_svc = permission_svc
    with pytest.raises(UserPermissionException):
        reservation_svc.get_reservation(
            user_data.user, reservation_data.reservation_4.id
        )
        calls = [
            call(
                user_data.user,
                "coworking.reservation.read",
                f"user/{reservation_data.reservation_4.users[0].id}",
            ),
            call(
                user_data.user,
                "coworking.reservation.read",
                f"user/{reservation_data.reservation_4.users[1].id}",
            ),
        ]
        permission_svc.check.assert_has_calls(calls)


def test_get_group_reservation(reservation_svc: ReservationService):
    fixed_time = datetime(2023, 1, 1, 12, 0, 0)  # Example fixed time

    # Create a valid GroupReservation request
    group_reservation_request = GroupReservation(
        group_id="test_group",
        users=["123456789", "987654321"],  # Example valid PIDs
        what="group_meeting",
        when=fixed_time,  # Example datetime
    )

    # Call the draft_group_reservation method
    result = reservation_svc.draft_group_reservation(group_reservation_request)
    group_reservation_request.when = result.when
    retrieved_reservation = reservation_svc.get_group_reservation("test_group")

    assert retrieved_reservation.group_id == "test_group"
    assert retrieved_reservation.users == ["123456789", "987654321"]
    assert retrieved_reservation.what == "group_meeting"
    assert retrieved_reservation.when == group_reservation_request.when


def test_get_ambass_group_reservations(reservation_svc: ReservationService):
    # Mock request
    request = AmbassadorReservation(group_id="test_group_id", status=False)

    # Call the function
    reservation_svc.draft_ambassador_group_reservation(request)

    result = reservation_svc.get_ambass_group_reservations()

    assert result[0].group_id == "test_group_id"
    assert result[0].status == False
