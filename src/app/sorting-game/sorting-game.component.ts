import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { QuitButtonComponent } from '../quit-button/quit-button.component';
import { PointsDisplayComponent } from '../points-display/points-display.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FailureDialogComponent } from '../failure-dialog/failure-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-sorting-game',
  templateUrl: './sorting-game.component.html',
  styleUrls: ['./sorting-game.component.css'],
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatButtonModule, QuitButtonComponent, FormsModule, PointsDisplayComponent]
})
export class SortingGameComponent implements OnInit {
  words: any[] = [];
  currentWordIndex = 0;
  currentWord: any;
  userInput = '';
  points = 0;
  progress = 0;
  categoryId!: string;
  categoyList: any;
  categorPickData: any;
  correctGuesses: number = 0;
  allGuesses: string[] = [];
  inOrderedWords: any[] = [];
  step: number = 0;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public categoryAPI: CategoriesService
  ) {
    // this.categoyList = this.categoryAPI.list();
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('category')!;
    });
  }

  ngOnInit(): void {
    this.initializeGame();
    this.calculateProgress();
  }

  initializeGame(): void {
    this.categorPickData = this.categoryAPI.list().filter((obj: any) => obj.id == this.categoryId)[0];
    this.words = this.categorPickData.words;
    this.inOrderedWords = this.generateInOrderedWords();
    this.currentWord = this.inOrderedWords[this.step];
  }

  generateInOrderedWords(): any[] {
    let shuffled = [...this.words].sort(() => 0.5 - Math.random());
    return shuffled;
  }

  checkAnswer(answer: boolean): void {
    const isCorrect = this.isAnswerCorrect(answer);

    if (isCorrect) {
      this.dialog.open(SuccessDialogComponent);
      this.correctGuesses++;
      this.points += Math.floor(100 / this.words.length);
    } else {
      this.dialog.open(FailureDialogComponent);
    }

    //this.allGuesses.push(answer ? 'Yes' : 'No');
    this.allGuesses.push(answer ? 'Yes' : 'No');
    this.nextWord();
  }

  isAnswerCorrect(answer: boolean): boolean {
    const wordBelongsToCategory = this.categorPickData.words.includes(this.currentWord);
    return wordBelongsToCategory === answer;
  }

  nextWord(): void {
    this.step++;
    if (this.step < this.inOrderedWords.length) {
      this.currentWord = this.inOrderedWords[this.step];
      this.calculateProgress();
    } else {
      this.showSummary();
    }
  }

  calculateProgress(): void {
    this.progress = (this.step / this.inOrderedWords.length) * 100;
  }

  showSummary(): void {
    this.router.navigate(['/summary'], {
      state: {
        data: {
          categoryName: this.categorPickData.name,
          points: this.points,
          correctGuesses: this.correctGuesses,
          words: this.categorPickData.words,
          guesses: this.allGuesses,
        },
      },
    });
    
    
  }
}
