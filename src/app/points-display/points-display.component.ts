import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-points-display',
  templateUrl: './points-display.component.html',
  styleUrls: ['./points-display.component.css'],
  standalone: true
})
export class PointsDisplayComponent {
  @Input() points: number = 0;
}
