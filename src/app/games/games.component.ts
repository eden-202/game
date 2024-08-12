import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GameProfileService } from '../services/game-profile.service';
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
        <mat-select (selectionChange)="categorySelect($event.value)">
          @for(item of categoyList; track item.id){
            <mat-option value="{{item.id}}">{{item.name}}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      @if(categoryPick > 0){
        <p>words: {{categorPickData.words.length}}</p>
        <p>last update: {{categorPickData.lastUpdateDate | date: 'dd/MM/yyyy'}}</p>
      }
      
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      @if(categoryPick > 0){
        <button mat-button mat-dialog-close routerLink="/game/{{gameAlias}}/{{categorPickData.id}}">Play</button>
      }
      
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [CommonModule, RouterLink, MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
})

export class DialogGamePick {
  categoyList:any;
  categoryPick = 0;
  categorPickData:any;
  gameAlias:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public categoryAPI:CategoriesService
  ) {
    console.log(data)
    if(data.gameid == 1){
      this.gameAlias = 'trivia';
    }else if(data.gameid == 2){
      this.gameAlias = 'mixed';
    }else if(data.gameid == 3){
      this.gameAlias = 'sorting';
    }
    this.categoyList = this.categoryAPI.list();
  }

  categorySelect(category:any){
    this.categoryPick = category;
    this.categorPickData = this.categoyList.filter((obj:any) => obj.id == this.categoryPick)[0];
    console.log(this.categorPickData)
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
