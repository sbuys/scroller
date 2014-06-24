var Scroller = require('../lib/Scroller');
var assert = require('assert');

describe("Automatic positioning", function () {
    it("should snap to specified tiles", function() {
        var scroller = new Scroller(null, { snapping : true });

        scroller.setDimensions(1000, 600, 5000, 5000);
        scroller.setSnapSize(50, 100);

        scroller.scrollTo(200, 400);
        var values = scroller.getValues();
        assert.equal(values.left, 200);
        assert.equal(values.top, 400);

        scroller.scrollTo(237, 124);
        var values = scroller.getValues();
        assert.equal(values.left, 250);
        assert.equal(values.top, 100);
    });

    it("should paginate to the specified dimension", function() {
        var scroller = new Scroller(null, { paging : true });

        scroller.setDimensions(1000, 600, 5000, 5000);

        scroller.scrollTo(1000, 600);
        var values = scroller.getValues();
        assert.equal(values.left, 1000);
        assert.equal(values.top, 600);

        scroller.scrollTo(1400, 1100);
        var values = scroller.getValues();
        assert.equal(values.left, 1000);
        assert.equal(values.top, 1200);
    });
});
