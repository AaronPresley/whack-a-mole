#!javascript

var Mole = require('../frontend/javascript/whackAMole/mole');


describe("Mole Object", function(){

    it("...should be initialized with no locations", function(done){
        var thisMole = new Mole();
        expect(thisMole.x).toBe(null);
        expect(thisMole.y).toBe(null);
        done();
    });

});
