import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface GameOverData {
  categoryName: string;
  points: number;
  correctGuesses: number;
  words: any[];
  guesses: string[];
}

export interface SummeryTable {
  english: string;
  category: string;
  guess: any;
  isCorrect: boolean;
}

@Component({
  selector: 'app-gameover',
  standalone: true,
  imports: [
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  displayedColumns: string[] = ['english', 'category', 'guess', 'iscorrect'];
  dataFromGame: GameOverData;
  dataSource: SummeryTable[];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.dataFromGame = navigation?.extras?.state?.['data'] as GameOverData;

    // עבור כל צמד מילים
    console.log(this.dataFromGame)
    this.dataSource = this.dataFromGame.words.map((translatedword, index) => ({
      
      // נחלץ את המילה בעברית
      // hebrew: translatedword.target,
      // נחלץ את המילה באנגלית
      english: translatedword.origin,
      category:  this.dataFromGame.categoryName, 
      guess: this.dataFromGame.guesses[index],
      // נבדוק אם הניחוש של המשתמש היה נכון
      isCorrect: this.isGuessCorrect(translatedword.origin, this.dataFromGame, this.dataFromGame.guesses[index])
      // isCorrect:
      //   this.dataFromGame.guesses[index].toLowerCase() ==
      //   this.dataFromGame.words[index].origin.toLowerCase(),
    }));
  }

  isGuessCorrect(word: string, category:any, guess: any): boolean {
    // אם המשתמש ניחש 'כן' והמילה באמת נמצאת בקטגוריה
    // או אם המשתמש ניחש לא, והמילה לא בקטגוריה
    if (guess == 'Yes' && category.words.some((tw:any) => tw.origin == word) ||
    guess != 'Yes' && !category.words.some((tw:any) => tw.origin == word)) {
      // המשתמש צדק
      return true;
    }
    // המשתמש טעה
    return false;
  }

  

  getIcon(success: boolean): string {
    return success ? 'check_circle' : 'cancel';
  }
  goToNewGame() {
    this.router.navigate(['choose-game']);
  }
}




// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-summary',
//   templateUrl: './summary.component.html',
//   styleUrls: ['./summary.component.css']
// })
// export class SummaryComponent implements OnInit {
//   displayedColumns: string[] = ['hebrew', 'english', 'result'];
//   summaryData = [
//     { hebrew: 'מילה1', english: 'word1', correct: true },
//     { hebrew: 'מילה2', english: 'word2', correct: false },
//     // הוספת נתונים נוספים כאן
//   ];

//   ngOnInit(): void {}
// }
