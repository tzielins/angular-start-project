System.register(['./hero.service', './mock-heroes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var hero_service_1, mock_heroes_1;
    return {
        setters:[
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            },
            function (mock_heroes_1_1) {
                mock_heroes_1 = mock_heroes_1_1;
            }],
        execute: function() {
            describe("HeroService", function () {
                var service;
                beforeEach(function () {
                    service = new hero_service_1.HeroService();
                });
                it("getHeros returns mocked heroes", function (done) {
                    service.getHeroes().then(function (heroes) {
                        expect(heroes).toBe(mock_heroes_1.HEROES);
                        done();
                    }, function () {
                        fail();
                        done();
                    });
                });
                it("registerHero adds new hero with the given name", function (done) {
                    var size = mock_heroes_1.HEROES.length;
                    var name = "Deadpool";
                    service.registerHero(name).then(function (hero) {
                        expect(mock_heroes_1.HEROES.length).toEqual(size + 1);
                        expect(hero.name).toEqual(name);
                        expect(mock_heroes_1.HEROES[mock_heroes_1.HEROES.length - 1]).toBe(hero);
                        done();
                    }, function () {
                        fail();
                        done();
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=hero.service.spec.js.map