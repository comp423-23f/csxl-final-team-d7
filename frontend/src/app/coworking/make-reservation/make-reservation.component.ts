import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // Add this import
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  AmbassadorGroupReservation,
  GroupReservation
} from '../coworking.models';
import { CoworkingService } from '../coworking.service';
import { GroupService } from 'src/app/group.service';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css']
})
export class MakeReservationComponent implements OnInit {
  currentTime!: string;
  formattedTime!: string;
  formattedTimeRange!: string;
  users: any[] = [];
  userGroups: { [groupId: string]: string[] } = {};
  groupId: any;
  generatedGroupIds: string[] = [];
  tableName: string;
  reservationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private coworkingService: CoworkingService,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute // Add this line
  ) {
    this.tableName = '';
    this.reservationForm = this.formBuilder.group({
      pid: '',
      when: '',
      what: ''
    });

    // Retrieve the table name from the query parameters
    this.route.queryParams.subscribe((params) => {
      this.tableName = params['what'];
    });
  }
  ngOnInit(): void {
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours to current time

    this.formattedTime = this.formatTime(currentTime);
    const formattedEndTime = this.formatTime(endTime);

    this.formattedTimeRange = `${this.formattedTime} to ${formattedEndTime}`;
  }

  // Helper function to format time
  private formatTime(time: Date): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${formattedHours}:${('0' + minutes).slice(
      -2
    )} ${ampm}`;
    return formattedTime;
  }

  public static Route = {
    path: 'make-reservation',
    component: MakeReservationComponent
  };

  onAddUser() {
    const pid = this.reservationForm.get('pid')?.value;
    console.log(`Selected PID: ${pid}`);
    if (!pid || pid.length !== 9) {
      window.alert('Error: Input must be exactly 9 characters long');
    } else if (this.users.includes(pid)) {
      window.alert('User already added: ' + pid);
    } else {
      this.users.push(pid);
      this.reservationForm.get('pid')?.reset();
      window.alert('User added: ' + pid);
    }
  }

  onSubmit() {
    if (this.users.length < 2) {
      window.alert('Error: At least 2 different users must be added');
    } else {
      const pid = this.reservationForm.value.pid;
      const mock_datetime: any = {};
      mock_datetime.now = () => new Date(2023, 0, 1, 12, 0, 0);

      this.groupId = this.generateRandomGroupId();
      this.userGroups[this.groupId] = this.users;
      const request: GroupReservation = {
        group_id: this.groupId,
        users: this.users,
        when: mock_datetime.now().toISOString(),
        what: this.tableName,
        start: mock_datetime.now().toISOString(),
        end: mock_datetime.now().toISOString()
      };

      const ambassadorRequest: AmbassadorGroupReservation = {
        group_id: this.groupId,
        status: false
      };

      this.coworkingService.draftGroupReservation(request).subscribe(
        (response) => {
          console.log('Reservation submitted successfully:', response);
        },
        (error) => {
          console.error('Error submitting reservation:', error);
        }
      );

      this.coworkingService
        .draftAmbassadorGroupReservation(ambassadorRequest)
        .subscribe(
          (response) => {
            console.log(ambassadorRequest);
            // Handle successful response from the backend
            console.log('Reservation submitted successfully:', response);
            // You may want to update your UI or perform other actions here
          },
          (error) => {
            // Handle error from the backend
            console.error('Error submitting reservation:', error);
            // You may want to show an error message to the user or perform other actions here
          }
        );
      // Construct the URL with parameters
      const url = `/confirmation/${this.groupId}/${encodeURIComponent(
        this.formattedTimeRange
      )}`;

      // Include route parameters in the array
      this.router.navigate([url, { what: this.tableName }]);
    }
  }

  private generateRandomGroupId(): string {
    const min = 1000;
    const max = 9999;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  }
}
