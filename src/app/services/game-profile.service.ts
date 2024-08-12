import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameProfileService {

  private listGames:any = [
    {
      id: 1,
      name: 'Trivia',
      description: 'Choose every word translation from list of 4 options',
      url: '/trivia'
    },{
      id: 2,
      name: 'Mixed Letters',
      description: 'Practice spelling, by finding the right order of letters for every in the category',
      url: '/mixedwords'
    },{
      id: 3,
      name: 'Word Sorter',
      description: 'Generate the game description',
      url: '/Word Sorter'
    }
  ]

  constructor() { 
    
  }

  public getGames():Observable<any[]> {
     return this.listGames; 
  }
}
