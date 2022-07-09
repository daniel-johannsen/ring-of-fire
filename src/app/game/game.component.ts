import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  newCardAnimation = false;

  constructor() { }

  ngOnInit(): void {
  }

  pickCard() {
    this.newCardAnimation = true;
  }

}
