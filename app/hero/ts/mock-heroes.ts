/// <reference path="../../../typings/browser.d.ts" />
import { Hero } from './hero.ts';

export let heroes: Hero[] = [
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
