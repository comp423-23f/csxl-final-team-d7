import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GroupReservation } from '../coworking.models';
import { CoworkingService } from '../coworking.service';
import { GroupService } from 'src/app/group.service';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css']
})
export class MakeReservationComponent {
  users: any[] = []; // Array to store added users
  userGroups: { [groupId: string]: string[] } = {};
  groupId: any;
  generatedGroupIds: string[] = [];
  reservationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private coworkingService: CoworkingService,
    private groupService: GroupService
  ) {
    this.reservationForm = this.formBuilder.group({
      pid: '',
      when: '',
      what: ''
    });
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
      // Add logic for the form submission
      window.alert('Form submitted');
      const pid = this.reservationForm.value.pid;
      const mock_datetime: any = {};
      mock_datetime.now = () => new Date(2023, 0, 1, 12, 0, 0);

      this.groupId = this.generateRandomGroupId();
      console.log(this.userGroups);
      this.userGroups[this.groupId] = this.users;
      const request: GroupReservation = {
        group_id: this.groupId,
        users: this.users,
        when: mock_datetime.now().toISOString(),
        what: this.reservationForm.value.what
      };

      this.coworkingService.draftGroupReservation(request).subscribe(
        (response) => {
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
      // Make the backend request
      this.generatedGroupIds.push(this.generateRandomGroupId()); // Store generated group ID
      this.groupService.setGroupIds([this.generateRandomGroupId()]); // Share group ID with the service

      this.users = [];
      this.reservationForm.reset();
      window.alert('Form submitted. Group ID: ' + this.groupId);
    }
  }
  private generateRandomGroupId(): string {
    const min = 1000;
    const max = 9999;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  }
}
