import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameProfile } from '../../shared/model/GameProfile';

@Injectable({
  providedIn: 'root'
})
export class GameProfileService {

  private games: GameProfile[] = [];

  constructor() { 
    let game1 = new GameProfile('1', 'Word Sorter', 'Player need to sort words', 'sorting');
    let game2 = new GameProfile('2', 'Mixed Letters', 'Player need to fix messy words', 'mixed');
    let game3 = new GameProfile('3', 'Trivia', 'Player need to translate words', 'trivia');

    this.games.push(game1);
    this.games.push(game2);
    this.games.push(game3);
  }

  public getGames() {
     return this.games; 
  }
}

