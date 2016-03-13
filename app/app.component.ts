import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="#hero of heroes"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <!--<my-hero-detail [hero]="selectedHero"></my-hero-detail>-->
    <form>
        <label for='hName'>New hero</label>
        <input type="text" class="form-control" required
            id="hName"
            placeholder="type hero name"
            ngControl="hName"  #hName="ngForm" >

        <button type="button" class="btn btn-default" [disabled]="!hName.valid" (click)="register(hName.value)">Add new</button>
        {{hName.value}}
    </form>
  `,
  styleUrls:['app/app.component.css'],
  directives: [HeroDetailComponent],
  providers: [HeroService]
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private _heroService: HeroService) { }

  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  register(heroName:string) {
      this.postRegistration(this._heroService.registerHero(heroName));
  }

  postRegistration(heroPromise:Promise<Hero>) {
      heroPromise.then( hero =>{
          this.selectedHero = hero;
          this.getHeroes();
          console.log("Registered: "+hero.name);
      })
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}
