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
    const pid = this.reservationForm.value.pid;
    console.log(`Selected PID: ${this.reservationForm.value.pid}`);

    if (pid.length !== 9) {
      window.alert('Error: Input must be exactly 9 characters long');
    } else if (this.users.includes(pid)) {
      window.alert('User already added: ' + pid);
    } else {
      this.users.push(pid);
      this.reservationForm.get('pid')!.reset();
      window.alert('User added: ' + pid);
    }
  }

  onSubmit() {
    if (this.users.length < 2) {
      window.alert('Error: At least 2 different users must be added');
    } else {
      // Add logic for the form submission
      console.log('Form submitted');
      console.log(`PID: ${this.reservationForm.value.pid}`);
      console.log(`When: ${this.reservationForm.value.when}`);
      console.log(`What: ${this.reservationForm.value.what}`);
      window.alert('Form submitted');
      const pid = this.reservationForm.value.pid;
      if (pid.length !== 9) {
        window.alert('Error: Input must be exactly 9 characters long');
      } else {
        this.groupId = this.generateRandomGroupId();
        console.log(this.userGroups);
        this.userGroups[this.groupId] = this.users;
        this.users = [];
        this.reservationForm.reset();
        window.alert('Form submitted. Group ID: ' + this.groupId);
      }
    }
  }
  private generateRandomGroupId(): string {
    const min = 1000;
    const max = 9999;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  }
}
