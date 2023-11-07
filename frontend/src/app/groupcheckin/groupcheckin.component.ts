import { Component } from '@angular/core';

@Component({
  selector: 'app-groupcheckin',
  templateUrl: './groupcheckin.component.html',
  styleUrls: ['./groupcheckin.component.css']
})
export class GroupcheckinComponent {
  public static Route = {
    path: 'make-group-reservation',
    component: GroupcheckinComponent
  };
}
