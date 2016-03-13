import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Injectable} from 'angular2/core';

@Injectable()
export class HeroService {
  getHeroes() {
    return Promise.resolve(HEROES);
  }

  registerHero(name:string):Promise<Hero> {

      let last = HEROES[HEROES.length-1];
      let hero = <Hero>{"id": last.id+1, "name": name};
      HEROES.push(hero);
      return Promise.resolve(hero);
  }
  
  // See the "Take it slow" appendix
  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }
}
