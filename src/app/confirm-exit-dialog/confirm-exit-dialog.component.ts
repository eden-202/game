import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-exit-dialog',
  templateUrl: './confirm-exit-dialog.component.html',
  styleUrls: ['./confirm-exit-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmExitDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<any>,
    private router: Router,
  ){
    
  }
  confirmExit(choice: string): void {
    if (choice === 'yes') {
      //games
      this.router.navigate(['/games']);
      this.dialogRef.close();
    } else {
      // נשאר במשחק הנוכחי
      this.dialogRef.close();
    }
  }
}
