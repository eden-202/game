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
  selector: 'app-mixed-letters',
  templateUrl: './mixed-letters.component.html',
  styleUrls: ['./mixed-letters.component.css'],
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatButtonModule, QuitButtonComponent, FormsModule, PointsDisplayComponent]
 
})
export class MixedLettersComponent implements OnInit {
  // words = [
  //   { hebrew: 'שלום', english: 'hello' },
  //   { hebrew: 'מילה', english: 'word' },
  //   { hebrew: 'עץ', english: 'tree' }
  //   // ניתן להוסיף מילים נוספות כאן
  // ];
  words = [];
  currentWordIndex = 0;
  currentWord:any;
  scrambledLetters: string[] = [];
  userInput = '';
  points = 0;
  progress = 0;
  categoryId!: string;
  categoyList:any;
  categorPickData:any;
  correctGuesses: number = 0;
  allGuesses: string[] = [];

  constructor(
    private dialog: MatDialog, 
    private router: Router,
    private route: ActivatedRoute,
    public categoryAPI:CategoriesService
  ) {
    this.categoyList = this.categoryAPI.list();
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('category')!;
      this.categorPickData = this.categoyList.filter((obj:any) => obj.id == this.categoryId)[0];
    });
    
  }

  ngOnInit(): void {
    this.scrambleLetters();
    this.calculateProgress();
  }

  scrambleLetters(): void {
    this.words = this.categorPickData.words;
    this.currentWord = this.words[this.currentWordIndex];
    this.scrambledLetters = this.currentWord.origin.split('').sort(() => Math.random() - 0.5);
  }

  submitWord(): void {
    if (this.userInput.toLowerCase() === this.currentWord.origin.toLowerCase()) {
      this.dialog.open(SuccessDialogComponent);
      this.correctGuesses++;
      this.points += Math.floor(100 / this.words.length);
      this.allGuesses.push('Yes');
    } else {
      this.allGuesses.push('No');
      this.dialog.open(FailureDialogComponent);
    }
    
    this.nextWord();
  }

  nextWord(): void {
    this.currentWordIndex++;
    if (this.currentWordIndex < this.words.length) {
      this.currentWord = this.words[this.currentWordIndex];
      this.scrambleLetters();
      this.userInput = '';
      this.calculateProgress();
    } else {
      this.showSummary();
    }
  }

  resetInput(): void {
    this.userInput = '';
  }

  calculateProgress(): void {
    this.progress = (this.currentWordIndex / this.words.length) * 100;
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
      // state: { points: this.points } 
    });
  }
}
