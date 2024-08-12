import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GameProfileService } from '../services/game-profile.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {

  constructor(
    public dialog: MatDialog,
    public gamesService: GameProfileService
  ){
    this.getGamesList(); 
  }

  gamesList:any;

  getGamesList(){
    this.gamesList = this.gamesService.getGames();
  }

  openDialog(gameid:number) {
    const dialogRef = this.dialog.open(DialogGamePick, {
      data: {
        gameid: gameid
      }
    });

     //dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
    // });
  }

}

 
@Component({
  selector: 'dialog-game-pick',
  //templateUrl: 'dialog-content-example-dialog.html',
  template: `
    <h2 mat-dialog-title>choose category to play</h2>

    <mat-dialog-content class="mat-typography">
      
      <mat-form-field>
        <mat-select>
        @for(item of categoyList; track item.id){
          <mat-option value="{{item.id}}">{{item.name}}</mat-option>
        }
        </mat-select>
      </mat-form-field>
      <p>words: 0</p>
      <p>last update: 0</p>


    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close routerLink="/trivia/colors">Play</button>
      
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
})

export class DialogGamePick {
  categoyList:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public categoryAPI:CategoriesService
  ) {
    this.categoyList = this.categoryAPI.list();

    //111
  }





}


// import { Input } from '@angular/core';

// @Component({
//   selector: 'app-games-card',
//   templateUrl: './game-card.component.html',
//   styleUrls: ['./game-card.component.css']
// })
// export class GameCardComponent {
//   @Input() game: any;
// }
