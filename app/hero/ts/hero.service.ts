/// <reference path="../../../typings/browser.d.ts" />
import { Injectable } from '@angular/core';
import { Hero }       from './hero';
import { heroes }     from './mock-heroes';

@Injectable()
export class HeroService {
  getHeroes() {
    return new Promise<Hero[]>(resolve => {
      setTimeout(() => resolve(heroes), 2000);
    });
  }
}
