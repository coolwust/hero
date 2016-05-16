/// <reference path="../../../typings/browser.d.ts" />
import { Component
       , Input     } from '@angular/core';
import { Hero }      from './hero';

@Component({
  selector: 'app-hero-editor',
  templateUrl: 'static/app/hero/tmpl/editor.tmpl'
})
export class EditorComponent {
  @Input()
  hero: Hero;
}
