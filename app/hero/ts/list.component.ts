/// <reference path="../../../typings/browser.d.ts" />
import { Component }       from '@angular/core';
import { EditorComponent } from './editor.component';
import { HeroService }     from './hero.service';
import { Hero }            from './hero';

@Component({
  selector:    'app-hero-list',
  templateUrl: '/static/app/hero/tmpl/list.tmpl',
  styleUrls:   ['static/app/hero/css/main.css'],
  directives:  [EditorComponent]
})
export class ListComponent {
  constructor(private heroService: HeroService) { }
  heroes: Hero[];
  selectedHero: Hero;
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
  ngOnInit() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
}
