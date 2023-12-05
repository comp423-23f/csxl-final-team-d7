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
}
