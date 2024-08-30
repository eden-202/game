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
  hebrew: string;
  english: string;
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
  displayedColumns: string[] = ['hebrew', 'english', 'iscorrect'];
  dataFromGame: GameOverData;
  dataSource: SummeryTable[];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.dataFromGame = navigation?.extras?.state?.['data'] as GameOverData;

    // עבור כל צמד מילים
    this.dataSource = this.dataFromGame.words.map((translatedword, index) => ({
      // נחלץ את המילה בעברית
      hebrew: translatedword.target,
      // נחלץ את המילה באנגלית
      english: translatedword.origin,
      // נבדוק אם הניחוש של המשתמש היה נכון
      isCorrect:
        this.dataFromGame.guesses[index].toLowerCase() ==
        this.dataFromGame.words[index].origin.toLowerCase(),
    }));
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
