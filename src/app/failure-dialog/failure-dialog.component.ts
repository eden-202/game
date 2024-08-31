import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-failure-dialog',
  templateUrl: './failure-dialog.component.html',
  styleUrls: ['./failure-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})
export class FailureDialogComponent {}
