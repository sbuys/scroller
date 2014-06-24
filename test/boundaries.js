var Scroller = require('../lib/Scroller');
var assert = require('assert');

describe("Boundaries", function () {
    it("should project scrolling into feasible window", function() {
        var scroller = new Scroller();

        // Scroll without dimensions
        scroller.scrollTo(200, 300);
        var values = scroller.getValues();
        assert.equal(values.left, 0);
        assert.equal(values.top, 0);

        // Setup
        scroller.setDimensions(1000, 600, 5000, 5000);

        // Scroll out of max
        scroller.scrollTo(10000, 10000);
        var values = scroller.getValues();
        assert.equal(values.left, 4000);
        assert.equal(values.top, 4400);

        // Scroll out of min
        scroller.scrollTo(-30, -100);
        var values = scroller.getValues();
        assert.equal(values.left, 0);
        assert.equal(values.top, 0);
    });

    it("should project scrolling along a fixed axis to 0", function () {
        var scroller = new Scroller(null, { scrollingX : false });

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 400);
        var values = scroller.getValues();
        assert.equal(values.left, 0);
        assert.equal(values.top, 400);

        var scroller = new Scroller(null, { scrollingY : false });

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.scrollTo(300, 400);
        var values = scroller.getValues();
        assert.equal(values.left, 300);
        assert.equal(values.top, 0);
    });

    it("should constrain zooming to avoid leaving the feasible window", function() {
        var scroller = new Scroller(null, { zooming : true });

        scroller.setDimensions(1000, 600, 5000, 5000);

        scroller.zoomTo(2);
        var values = scroller.getValues();
        assert.equal(values.zoom, 2);

        scroller.zoomTo(20);
        var values = scroller.getValues();
        assert.equal(values.zoom, 3);

        scroller.zoomTo(0.1);
        var values = scroller.getValues();
        assert.equal(values.zoom, 0.5);
    });
});
