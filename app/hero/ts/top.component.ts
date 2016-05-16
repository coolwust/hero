import { Component
       , OnInit    }   from '@angular/core';
import { HeroService } from './hero.service';
import { Hero }        from './hero';

@Component({
  selector: 'app-hero-top',
  templateUrl: '/static/app/hero/tmpl/top.tmpl'
})
export class TopComponent implements OnInit {
  heroes: Hero[];
  constructor(private heroService: HeroService) { }
  ngOnInit() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  gotoDetail() {
    // TODO
  }
}
