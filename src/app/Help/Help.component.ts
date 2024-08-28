import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-Help',
  standalone: true,
  imports: [    CommonModule,RouterModule
  ],
  templateUrl: './Help.component.html',
  styleUrl: './Help.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HelpComponent {
  

}
