/// <reference path="../../../typings/browser.d.ts" />
import { Component }         from '@angular/core';
import { RouteConfig 
       , ROUTER_DIRECTIVES
       , ROUTER_PROVIDERS  } from '@angular/router-deprecated';
import { HeroService }       from './hero.service';
import { ListComponent }     from './list.component';
import { TopComponent }      from './top.component';

@Component({
  selector:    'app-hero',
  templateUrl: '/static/app/hero/tmpl/app.tmpl',
  directives:  [ROUTER_DIRECTIVES],
  providers:   [ROUTER_PROVIDERS, HeroService]
})
@RouteConfig([
  {
    path:      '/list',
    name:      'List',
    component: ListComponent
  },
  {
    path:      '/top',
    name:      'Top',
    component: TopComponent,
    useAsDefault: true
  }
])
export class AppComponent {
  title = 'Tour of Heros';
}
