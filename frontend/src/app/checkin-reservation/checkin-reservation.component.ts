import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GroupService } from '../group.service';
import { AmbassadorGroupReservation } from '../coworking/coworking.models';
@Component({
  selector: 'app-display-group-id',
  templateUrl: './checkin-reservation.component.html',
  styleUrls: ['./checkin-reservation.component.css']
})
export class GroupListComponent implements OnInit {
  groupIds: string[] = [];
  isCheckInMode: boolean = true; // Track whether it's check-in or check-out
  public ambassGroups: AmbassadorGroupReservation[] = [];
  constructor(private groupService: GroupService) {}

  public static Route = {
    path: 'checkin-reservation',
    component: GroupListComponent
  };

  ngOnInit(): void {
    this.groupService.getAmbassGroups().subscribe(
      (data: AmbassadorGroupReservation[]) => {
        this.ambassGroups = data;
        console.log(data + 'this is data');
      },
      (error) => {
        console.error('Error fetching ambassador groups:', error);
      }
    );
  }

  handleCheckIn(x: string) {
    this.groupService.checkInGroup(x).subscribe(
      (data: AmbassadorGroupReservation) => {
        this.ambassGroups = [data]; // Wrap the single object in an array
        console.log(data, 'this is data');
      },
      (error) => {
        console.error('Error checking in the ambassador group:', error);
      }
    );
  }

  handleCheckOut(x: string) {
    // Add logic for handling Check-Out
    // For example, you might want to update the reservation state
    // or perform any other necessary actions
    console.log('Check-Out clicked');
    this.isCheckInMode = true; // Switch back to Check-In mode
  }
}
