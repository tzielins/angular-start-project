
import {AppComponent} from './app.component';
import {HeroService} from './hero.service';
import {Hero} from './hero';

describe("AppComponent",()=>{

    let component:AppComponent;
    let service: HeroService;

    beforeEach(()=>{
            service = new HeroService();
            component = new AppComponent(service);
            component.ngOnInit();
    });

    it("test setup",()=>{
        expect(component).not.toBeUndefined();
    });

    it("postRegistration sets selectedHero as registered one",done =>{
        let promise = service.registerHero("Bosek"); //Promise.resolve(hero);
        component.postRegistration(promise);
        promise.then( hero => {
            expect(component.selectedHero).toBe(hero);
            expect(component.heroes.indexOf(hero)).toBeGreaterThan(0);
            done();
        }).catch( e=> {
            console.log("Error: "+e);
            fail(e);
            done();
        })
    })
});
