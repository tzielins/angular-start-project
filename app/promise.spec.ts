
import {
    it,
    xit,
    describe,
    expect,
    inject,
    injectAsync,
    TestComponentBuilder,
    beforeEachProviders,
    fakeAsync,
    tick,
    flushMicrotasks
} from 'angular2/testing';

describe("checkign promises testing",()=>{


    it('Promises not fulfilled if tested before done',done=>{

        let x = 1;
        let y = 2;

        let dealWithIt = function(p:Promise<number>) {
            p.then( v => {
                x = v;
                Promise.resolve(v).then( v=> {y = v+1});
            });
        };

        let p = Promise.resolve(y);

        dealWithIt(p);

        //promises not resolved yet
        expect(x).toBe(1);
        expect(y).toBe(2);
        done();

    });

    it('Promises fulfilled after done',done=>{

        let x = 1;
        let y = 2;

        let dealWithIt = function(p:Promise<number>) {
            p.then( v => {
                x = v;
                Promise.resolve(v).then( v=> {y = v+1; });
            });
        };

        let p = Promise.resolve(y);

        dealWithIt(p);

        done();
        //promises to be resolved
        expect(x).toBe(2);
        expect(y).toBe(3);

    });

    xit('Promises fulfilled by using only fakeAsync',fakeAsync((): void => {

        let x = 1;
        let y = 2;

        let dealWithIt = function(p:Promise<number>) {
            p.then( v => {
                x = v;
                Promise.resolve(v).then( v=> {y = v+1; });
            });
        };

        let p = Promise.resolve(y);

        dealWithIt(p);

        //promises to be resolved
        expect(x).toBe(2);
        expect(y).toBe(3);

    }));

    it('Promises fulfilled by flushMicrotasks',fakeAsync((): void => {

        let x = 1;
        let y = 2;

        let dealWithIt = function(p:Promise<number>) {
            p.then( v => {
                x = v;
                Promise.resolve(v).then( v=> {y = v+1; });
            });
        };

        let p = Promise.resolve(y);

        dealWithIt(p);

        flushMicrotasks();
        //promises to be resolved
        expect(x).toBe(2);
        expect(y).toBe(3);


    }));

    it('Promises fulfilled by tick',fakeAsync((): void => {
        let x = 1;
        let y = 2;

        let dealWithIt = function(p:Promise<number>) {
            p.then( v => {
                x = v;
                Promise.resolve(v).then( v=> {y = v+1; });
            });
        };

        let p = Promise.resolve(y);

        dealWithIt(p);

        tick();
        //promises to be resolved
        expect(x).toBe(2);
        expect(y).toBe(3);

    }));


    xit('Promises fulfilled by hooking to promise',done=>{

        let x = 1;
        let y = 2;

        let dealWithIt = function(p:Promise<number>) {
            p.then( v => {
                x = v;
                Promise.resolve(v).then( v=> {y = v+1;});
            });
        };

        let p = Promise.resolve(y);

        dealWithIt(p);

        p.then( v => {
            //promises to be resolved
            expect(x).toBe(2);
            expect(y).toBe(3);

            done();
        }).catch(e => {
            fail(e);
            done();
        })
    });

    it('Promises fulfilled by chaining to promise',done=>{

        let x = 1;
        let y = 2;

        let dealWithIt = function(p:Promise<number>):Promise<number> {
            return p.then( v => {
                x = v;
                return Promise.resolve(v).then( v=> {y = v+1; return y;});
            });
        };

        let p = Promise.resolve(y);

        dealWithIt(p).then( v => {
            console.log("V"+v);
            //promises to be resolved
            expect(x).toBe(2);
            expect(y).toBe(3);

            done();
        })
    })

});