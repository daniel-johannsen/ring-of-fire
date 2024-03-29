import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {  
  game: Game;
  gameId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];
      this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe((game: any) => {
        console.log('Game update', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.player_images = game.player_images;
        this.game.stack = game.stack;
        this.game.newCardAnimation = game.newCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });
  }

  newGame() {
    this.game = new Game();
    
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
      window.open("https://ring-of-fire-594a8.web.app", "_self");
    }
    if (!this.game.newCardAnimation) {
      this.takeCard();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.newCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }


  takeCard() {
    this.game.currentCard = this.game.stack.pop();
    this.game.newCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
  }


  editPlayer(PlayerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    
    dialogRef.afterClosed().subscribe((change: string) => {
      if(change) {
        if(change == 'DELETE') {
          this.game.player_images.splice(PlayerId, 1);
          this.game.players.splice(PlayerId, 1);
        } else {
          this.game.player_images[PlayerId] = change;
        }        
        this.saveGame();
      }
    });
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('avatar1.png');
        this.saveGame();
      }
    });
  }

  saveGame() {
    this
    .firestore
    .collection('games')
    .doc(this.gameId)
    .update(this.game.toJson());
  }

}
