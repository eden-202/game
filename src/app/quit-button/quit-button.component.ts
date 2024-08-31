import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmExitDialogComponent } from '../confirm-exit-dialog/confirm-exit-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quit-button',
  templateUrl: './quit-button.component.html',
  styleUrls: ['./quit-button.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ConfirmExitDialogComponent
  ]
})
export class QuitButtonComponent {

  constructor(private dialog: MatDialog, private router: Router) {}

  confirmExit(): void {
    const dialogRef = this.dialog.open(ConfirmExitDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.router.navigate(['/game-selection']);
      }
    });
  }
}
