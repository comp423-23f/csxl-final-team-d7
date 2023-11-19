import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-newRes',
  templateUrl: './newRes.widget.html',
  styleUrls: ['./newRes.widget.css'],
  animations: [
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
export class NewResComponent implements OnInit {
  static Route: Router;
  widgetState = 'collapsed';
  constructor(private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toggleWidget() {
    this.widgetState =
      this.widgetState === 'collapsed' ? 'expanded' : 'collapsed';
  }
  /** Button within the widget to navigate to input fields comp */
  navigateToOtherScreen() {
    this.router.navigate(['/make-reservation']);
  }
}
