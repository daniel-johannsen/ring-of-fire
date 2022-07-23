import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  newCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  checkPlayerArray() {
    if (this.game.players.length < 1) {
      alert('Please set the player names by clicking on +');
    } else {
      this.pickCard();
    }
  }

  pickCard() {
    if (this.game.stack.length < 1){
      alert('The game is over');
      window.location.reload();
    }
    if (!this.newCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.newCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.newCardAnimation = false;
      }, 1000);
    }
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}
