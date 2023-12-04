import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GroupService } from '../group.service';
import { AmbassadorGroupReservation } from '../coworking/coworking.models';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-display-group-id',
  templateUrl: './checkin-reservation.component.html',
  styleUrls: ['./checkin-reservation.component.css']
})
export class GroupListComponent implements OnInit {
  public notCheckedIn: AmbassadorGroupReservation[] = [];
  public checkedIn: AmbassadorGroupReservation[] = [];
  public isCheckInMode: boolean = true; // Track whether it's check-in or check-out
  public ambassGroups: AmbassadorGroupReservation[] = [];
  constructor(
    private groupService: GroupService,
    private cdr: ChangeDetectorRef
  ) {}

  public static Route = {
    path: 'checkin-reservation',
    component: GroupListComponent
  };

  ngOnInit(): void {
    this.groupService.getAmbassGroups().subscribe(
      (data: AmbassadorGroupReservation[]) => {
        data.forEach((item: AmbassadorGroupReservation) => {
          item.status
            ? this.checkedIn.push(item)
            : this.notCheckedIn.push(item);
          console.log(item);
        });
      },
      (error) => {
        console.error('Error fetching ambassador groups:', error);
      }
    );
  }

  handleCheckIn(x: string) {
    this.groupService.checkInGroup(x).subscribe(
      (data: AmbassadorGroupReservation) => {
        var foundObject: any = this.notCheckedIn.find(
          (item) => item.group_id === x
        );
        foundObject = { ...foundObject, status: true };
        this.notCheckedIn = this.notCheckedIn.filter(
          (item) => item.group_id !== x
        );
        // Wrap the single object in an 'array
        this.checkedIn = [...this.checkedIn, foundObject];
      },
      (error) => {
        console.error('Error checking in the ambassador group:', error);
      }
    );
  }
  handleCheckOut(x: string) {
    this.groupService.checkOutGroup(x).subscribe(
      (data: AmbassadorGroupReservation) => {
        const foundObject: any = this.checkedIn.find(
          (item) => item.group_id === x
        );
        this.checkedIn = this.checkedIn.filter((item) => item.group_id !== x);
      },
      (error) => {
        console.error('Error checking in the ambassador group:', error);
      }
    );
  }
}
