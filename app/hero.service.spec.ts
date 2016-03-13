
import {HeroService} from './hero.service';
import {HEROES} from './mock-heroes';

describe("HeroService",()=>{

    let service:HeroService;

    beforeEach(()=>{
        service = new HeroService();
    })

    it("getHeros returns mocked heroes",done=>{

        service.getHeroes().then( heroes => {
            expect(heroes).toBe(HEROES);
            done();
        },()=> {
            fail();
            done();
        })
    })

    it("registerHero adds new hero with the given name",done=>{
        let size = HEROES.length;
        let name = "Deadpool";

        service.registerHero(name).then( hero => {
            expect(HEROES.length).toEqual(size+1);
            expect(hero.name).toEqual(name);
            expect(HEROES[HEROES.length-1]).toBe(hero);
            done();
        }, () => {
            fail();
            done();
        })
    })
})
