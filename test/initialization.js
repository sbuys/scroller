var Scroller = require('../lib/Scroller');
var assert = require('assert');

describe("Initialization", function () {
    it("should construct scroller objects", function() {
        var scroller1 = new Scroller();
        assert.equal(typeof scroller1, "object");

        var scroller2 = new Scroller(function(left, top, zoom) {});
        assert.equal(typeof scroller2, "object");

        var scroller3 = new Scroller(null, {
            scrollingY: false
        });
        assert.equal(typeof scroller3, "object");

        var scroller4 = new Scroller(function(left, top, zoom) {}, {
            scrollingY: false
        });
        assert.equal(typeof scroller4, "object");
    });

    it("should accept dimensions", function() {
        var scroller = new Scroller();
        assert.equal(typeof scroller, "object");        
        scroller.setDimensions(1000, 600, 5000, 5000);
    });

    it("should recall accepted dimensions", function() {
        var scroller = new Scroller();
        assert.equal(typeof scroller, "object");        
        scroller.setDimensions(1000, 600, 5000, 5000);
        var values = scroller.getValues();
        assert.equal(typeof values, "object");
        assert.equal(values.left, 0);
        assert.equal(values.top, 0);
        assert.equal(values.zoom, 1);
    });
});
