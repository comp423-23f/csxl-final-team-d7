import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  groupId!: string;
  startTime!: string;
  endTime!: string;
  where!: string;
  formattedTimeRange!: string;
  what!: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.groupId = this.route.snapshot.params['groupId'];
    this.formattedTimeRange = decodeURIComponent(
      this.route.snapshot.params['formattedTimeRange']
    );
    this.what = this.route.snapshot.paramMap.get('what');

    // Extract start and end times from formattedTimeRange
    const [startTime, endTime] = this.formattedTimeRange.split(' to ');

    // Set startTime and endTime properties for display
    this.startTime = this.formatTime(startTime);
    this.endTime = this.formatTime(endTime);
  }

  private formatTime(time: string): string {
    return time;
  }
}
