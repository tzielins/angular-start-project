System.register(['./app.component', './hero.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_component_1, hero_service_1;
    return {
        setters:[
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            }],
        execute: function() {
            describe("AppComponent", function () {
                var component;
                var service;
                beforeEach(function () {
                    service = new hero_service_1.HeroService();
                    component = new app_component_1.AppComponent(service);
                });
                it("test setup", function () {
                    expect(component).not.toBeUndefined();
                });
                it("postRegistration sets selectedHero as registered one", function (done) {
                    var hero = { "id": 100, "name": "BigBoss" };
                    var promise = Promise.resolve(hero);
                    component.ngOnInit();
                    component.postRegistration(promise);
                    promise.then(function (h) {
                        expect(component.selectedHero).toBe(hero);
                        expect(component.heroes.indexOf(hero)).toBeGreaterThan(0);
                        done();
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=app.component.spec.js.map