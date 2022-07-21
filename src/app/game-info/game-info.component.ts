import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {

  cardAction = [
    { title: 'Waterfall', description: 'Starting with the player who drew the card, every player has to continually drink their drink. The next player can only stop when the player to their right has stopped drinking.'},
    { title: 'You', description: 'Choose who you want to take a drink.'},
    { title: 'Me', description: 'You yourself take a drink.'},
    { title: 'Category', description: 'Come up with a category (e.g. Cars). Each player have to enumerate one item from the category.'},
    { title: 'Bust a jive', description: 'You make a dance move. The next player repeats your move and adds a second move. And so on ...'},
    { title: 'Chicks', description: 'All women drink.'},
    { title: 'Heaven', description: 'Last one to put their hands in the air drinks.'},
    { title: 'Mate', description: 'Choose a mate. Whenever you drink, they drink, and vice versa. If your mate already has a mate, you are now one long mate chain.'},
    { title: 'Thumbmaster', description: 'You have to put your thumb on the table at a chosen time. The last person to put their thumb on the table have to drink.'},
    { title: 'Men', description: 'All men drink.'},
    { title: 'Quizmaster', description: 'You become the question master and if anybody answers a question asked by you, they have to drink. This applies to ANY question.'},
    { title: 'Never have i ever', description: 'Say something you never did. Everyone who did it has to drink.'},
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.'},
  ]

  title = '';
  description = '';
  @Input() card: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }

}
