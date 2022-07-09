import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  newCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  pickCard() {
    if (!this.newCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.newCardAnimation = true;


      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.newCardAnimation = false;
      }, 1000);
    }    
  }

}
