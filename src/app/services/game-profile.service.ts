import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameProfile } from '../../shared/model/GameProfile';

@Injectable({
  providedIn: 'root'
})
export class GameProfileService {

  private games: GameProfile[] = [];

  // private listGames:any = [
  //   {
  //     id: 1,
  //     name: 'Trivia',
  //     description: 'Choose every word translation from list of 4 options',
  //     url: '/trivia'
  //   },{
  //     id: 2,
  //     name: 'Mixed Letters',
  //     description: 'Practice spelling, by finding the right order of letters for every in the category',
  //     url: '/mixedwords'
  //   },{
  //     id: 3,
  //     name: 'Word Sorter',
  //     description: 'Generate the game description',
  //     url: '/Word Sorter'
  //   }
  // ]

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

