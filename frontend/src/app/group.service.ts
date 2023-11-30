import { Injectable } from '@angular/core';
import { AmbassadorGroupReservation } from './coworking/coworking.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GroupService {
  private groupIds: string[] = [];
  private ambassGroups: AmbassadorGroupReservation[] = [];
  public constructor(protected http: HttpClient) {}

  getGroupIds(): string[] {
    return this.groupIds;
  }

  setGroupIds(ids: string[]): void {
    this.groupIds = ids;
  }

  getAmbassGroups() {
    return this.http.get<AmbassadorGroupReservation[]>(
      '/api/coworking/get_ambass_group_reservations'
    );
  }

  checkInGroup(x: string) {
    const newAmbassGroup: AmbassadorGroupReservation = {
      group_id: x,
      status: true
    };

    return this.http.put<AmbassadorGroupReservation>(
      `/api/coworking/ambass_group_reservation/${x}`,
      newAmbassGroup
    );
  }
}
