import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-newRes',
  templateUrl: './newRes.widget.html',
  styleUrls: ['./newRes.widget.css']
})
export class NewResComponent {
  constructor(private router: Router) {}
  /** Button within the widget to navigate to input fields comp */
  navigateToOtherScreen() {
    this.router.navigate(['/other-screen']);
  }
}
