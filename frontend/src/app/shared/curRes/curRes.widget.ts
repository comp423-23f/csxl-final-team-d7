import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-curRes',
  templateUrl: './curRes.widget.html',
  styleUrls: ['./curRes.widget.css']
})
export class CurrentResComponent {
  constructor(private router: Router) {}
  /** Button within the widget to navigate to input fields comp */
  navigateToOtherScreen() {
    this.router.navigate(['/other-screen']); //ADD NECESSARY ROUTAGE
  }
}
