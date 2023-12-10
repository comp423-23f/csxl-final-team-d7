import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CoworkingService } from 'src/app/coworking/coworking.service';

@Component({
  selector: 'app-group-availability',
  templateUrl: './group-availability.widget.html',
  styleUrls: ['./group-availability.widget.css']
})
export class GroupAvailabilityComponent {
  roundTableCount: number = 0;
  conferenceTableCount: number = 0;
  totalSeats: number = 10;
  constructor(
    private router: Router,
    private coworkingService: CoworkingService
  ) {}
  /** Button within the widget to navigate to input fields comp */
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.coworkingService.getSeats().subscribe((response) => {
      this.roundTableCount = +response['round table'];
      this.conferenceTableCount = +response['conference table'];
    });
  }

  navigateToOtherScreen(tableName: string) {
    this.router.navigate(['/make-reservation'], {
      queryParams: { what: tableName }
    }); //ADD NECESSARY ROUTAGE
  }

  onClick(tableType: string): void {
    const count =
      tableType === 'Round Table'
        ? this.totalSeats - this.roundTableCount
        : this.totalSeats - this.conferenceTableCount;

    if (count > 0) {
      // Perform navigation logic here
      this.navigateToOtherScreen(tableType);
    }
    // You can add an else block if you want to handle the case when the button is disabled
  }
}
