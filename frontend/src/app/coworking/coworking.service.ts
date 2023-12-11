import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription, map, tap } from 'rxjs';
import {
  CoworkingStatus,
  CoworkingStatusJSON,
  GroupReservation,
  GroupReservationJSON,
  Reservation,
  ReservationJSON,
  SeatAvailability,
  parseCoworkingStatusJSON,
  parseReservationJSON,
  AmbassadorGroupReservation
} from './coworking.models';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../models.module';
import { RxCoworkingStatus } from './rx-coworking-status';
import { NumberInput } from '@angular/cdk/coercion';

const ONE_HOUR = 60 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class CoworkingService implements OnDestroy {
  private status: RxCoworkingStatus = new RxCoworkingStatus();
  public status$: Observable<CoworkingStatus> = this.status.value$;

  private profile: Profile | undefined;
  private profileSubscription!: Subscription;

  public constructor(
    protected http: HttpClient,
    protected profileSvc: ProfileService
  ) {
    this.profileSubscription = this.profileSvc.profile$.subscribe(
      (profile) => (this.profile = profile)
    );
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }

  pollStatus(): void {
    this.http
      .get<CoworkingStatusJSON>('/api/coworking/status')
      .pipe(map(parseCoworkingStatusJSON))
      .subscribe((status) => this.status.set(status));
  }

  draftReservation(seatSelection: SeatAvailability[]) {
    if (this.profile === undefined) {
      throw new Error('Only allowed for logged in users.');
    }

    let start = seatSelection[0].availability[0].start;
    let end = new Date(start.getTime() + 2 * ONE_HOUR);
    let reservation = {
      users: [this.profile],
      seats: seatSelection.map((seatAvailability) => {
        return { id: seatAvailability.id };
      }),
      start,
      end
    };

    return this.http
      .post<ReservationJSON>('/api/coworking/reservation', reservation)
      .pipe(map(parseReservationJSON));
  }

  draftGroupReservation(groupReservation: GroupReservation) {
    // Given a group reservation object, this service method will send a POST request to the server to draft a group reservation.
    return this.http.post<GroupReservationJSON>(
      '/api/coworking/group_reservation',
      groupReservation
    );
  }
  getSeats(): Observable<{
    'round table': number;
    'conference table': number;
  }> {
    // Given an Observable, this service method will send a GET request to
    // the server to retrieve the total amount of seats available for each type of table.
    return this.http.get<{ 'round table': number; 'conference table': number }>(
      '/api/coworking/get_seats'
    );
  }

  draftAmbassadorGroupReservation(
    ambassadorGroupReservation: AmbassadorGroupReservation
  ) {
    // Given a Ambassador group reservation object, this service method will send a POST request
    // to the server to draft an Ambassador group reservation id with an intial status of 'false'.
    return this.http.post<AmbassadorGroupReservation>(
      '/api/coworking/ambassador_group_reservation',
      ambassadorGroupReservation
    );
  }
}
