import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { GameProfileService } from '../services/game-profile.service';
import { DialogGamePick } from './dialog-game-pick.component';
import { GameProfile } from '../../shared/model/GameProfile';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule, DialogGamePick],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {

  constructor(
    public dialog: MatDialog,
    public gamesService: GameProfileService
  ){
    
  }

  ngOnInit(){
    this.getGamesList(); 
  }

  gamesList: GameProfile[] = [];

  getGamesList(){
    this.gamesList = this.gamesService.getGames();
  }

  openDialog(game: GameProfile) {
    const dialogRef = this.dialog.open(DialogGamePick, {
      data: game
    });

     //dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
    // });
  }

}

 
// @Component({
//   selector: 'dialog-game-pick',
//   //templateUrl: 'dialog-content-example-dialog.html',
//   template: `
//     <h2 mat-dialog-title>choose category to play</h2>

//     <mat-dialog-content class="mat-typography">
      
//       <mat-form-field>
//         <mat-select (selectionChange)="categorySelect($event.value)">
//           @for(item of categoyList; track item.id){
//             <mat-option value="{{item.id}}">{{item.name}}</mat-option>
//           }
//         </mat-select>
//       </mat-form-field>
//       @if(categoryPick){
//         <p>words: {{categorPickData.words.length}}</p>
//         <p>last update: {{categorPickData.lastUpdateDate | date: 'dd/MM/yyyy'}}</p>
//       }
      
//     </mat-dialog-content>
//     <mat-dialog-actions align="end">
//       @if(categoryPick){
//         <button mat-button mat-dialog-close routerLink="/game/{{gameAlias}}/{{categorPickData.id}}">Play</button>
//       }
      
//     </mat-dialog-actions>
//   `,
//   standalone: true,
//   imports: [CommonModule, RouterLink, MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
// })

// export class DialogGamePick {
//   categoyList:any;
//   categoryPick = 0;
//   categorPickData:any;
//   gameAlias:any;

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     public categoryAPI:CategoriesService
//   ) {
//     if(data.gameid == 1){
//       this.gameAlias = 'trivia';
//     }else if(data.gameid == 2){
//       this.gameAlias = 'mixed';
//     }else if(data.gameid == 3){
//       this.gameAlias = 'sorting';
//     }
//     this.categoyList = this.categoryAPI.list();
//   }

//   categorySelect(category:any){
//     this.categoryPick = category;
//     this.categorPickData = this.categoyList.filter((obj:any) => obj.id == this.categoryPick)[0];
//   }

// }


// import { Input } from '@angular/core';

// @Component({
//   selector: 'app-games-card',
//   templateUrl: './game-card.component.html',
//   styleUrls: ['./game-card.component.css']
// })
// export class GameCardComponent {
//   @Input() game: any;
// }
