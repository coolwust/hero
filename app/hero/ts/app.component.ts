/// <reference path="../../../typings/browser.d.ts" />
import { Component } from '@angular/core';

let heroes: Hero[] = [
  'Mr. Nice',
  'Narco',
  'Bombasto',
  'Celeritas',
  'Magneta',
  'RubberMan',
  'Dynama',
  'Dr IQ',
  'Magma',
  'Tornado'
].map((name, i) => ({id: i, name: name}));

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-hero',
  templateUrl: '/static/app/hero/tmpl/heroes.tmpl',
  styleUrls: ['static/app/hero/css/main.css']
})
export class AppComponent {
  title = 'Tour of Heros';
  heroes = heroes;
  selectedHero: Hero;
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}
