import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css']
})
export class MakeReservationComponent {
  users: any[] = []; // Array to store added users
  userGroups: { [groupId: string]: string[] } = {};
  groupId: any;
  reservationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private zone: NgZone
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
    // Add logic for the "Add User" button click event
    const pid = this.reservationForm.value.pid;
    this.users.push(pid);
    this.reservationForm.get('pid')!.reset();
  }

  onSubmit() {
    // Add logic for the form submission
    console.log('Form submitted');
    console.log(`PID: ${this.reservationForm.value.pid}`);
    console.log(`When: ${this.reservationForm.value.when}`);
    console.log(`What: ${this.reservationForm.value.what}`);
    window.alert('Form submitted');
    this.zone.run(() => {
      // Trigger change detection explicitly
      this.groupId = this.generateRandomGroupId();
      console.log(this.userGroups);

      // Use the group ID as the key and store the users array as its value
      this.userGroups[this.groupId] = this.users;

      // Reset users array for the next submission
      this.users = [];
    });
  }
  private generateRandomGroupId(): string {
    const min = 1000;
    const max = 9999;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  }
}
