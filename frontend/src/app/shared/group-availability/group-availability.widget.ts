import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-group-availability',
  templateUrl: './group-availability.widget.html',
  styleUrls: ['./group-availability.widget.css']
})
export class GroupAvailabilityComponent {
  constructor(private router: Router) {}
  /** Button within the widget to navigate to input fields comp */
  navigateToOtherScreen() {
    this.router.navigate(['/make-reservation']); //ADD NECESSARY ROUTAGE
  }
}
