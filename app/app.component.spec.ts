
import {AppComponent} from './app.component';
import {HeroService} from './hero.service';
import {Hero} from './hero';

describe("AppComponent",()=>{

    let component:AppComponent;
    let service: HeroService;

    beforeEach(()=>{
            service = new HeroService();
            component = new AppComponent(service);
    })

    it("test setup",()=>{
        expect(component).not.toBeUndefined();
    })

    it("postRegistration sets selectedHero as registered one",done =>{
        let hero = <Hero>{"id": 100, "name": "BigBoss"};
        let promise = Promise.resolve(hero);
        component.ngOnInit();

        component.postRegistration(promise);
        promise.then( h => {
            expect(component.selectedHero).toBe(hero);
            expect(component.heroes.indexOf(hero)).toBeGreaterThan(0);
            done();
        })
    })
})
