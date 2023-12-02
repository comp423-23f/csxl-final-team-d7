// Import necessary modules from Angular
import { Router } from '@angular/router';
import { Component } from '@angular/core';

// Import animation-related modules from Angular
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

// Decorator to define the component
@Component({
  selector: 'app-newRes',
  templateUrl: './newRes.widget.html',
  styleUrls: ['./newRes.widget.css'],
  animations: [
    // Define animations for expanding and collapsing
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '50px' // Set the initial height
        })
      ),
      state(
        'expanded',
        style({
          height: '200px' // Set the expanded height
        })
      ),
      transition('collapsed => expanded', animate('300ms ease-in')),
      transition('expanded => collapsed', animate('300ms ease-out'))
    ])
  ]
})

// Class definition for the component
export class NewResComponent {
  // Define a static property for the Router (uncommon)
  static Route: Router;

  // Define a property to store the widget state (collapsed or expanded)
  widgetState = 'collapsed';

  // Constructor for the component, injecting the Router
  constructor(private router: Router) {}

  // Method to toggle the widget state between collapsed and expanded
  toggleWidget() {
    this.widgetState =
      this.widgetState === 'collapsed' ? 'expanded' : 'collapsed';
  }

  // Method triggered when the button is clicked to navigate to another screen
  navigateToOtherScreen() {
    // Get the current time
    const currentTime = new Date();

    // Format the current time
    const formattedTime = currentTime.toISOString();

    // Navigate to the '/make-reservation' route with queryParams 'currentTime'
    this.router.navigate(['/make-reservation'], {
      queryParams: { currentTime: formattedTime }
    });
  }

  // Helper function to format time
  private formatTime(time: Date): string {
    return time.toISOString();
  }
}
