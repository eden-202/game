import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})
export class SuccessDialogComponent {}
