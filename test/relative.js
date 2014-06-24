var Scroller = require('../lib/Scroller');
var assert = require('assert');

describe("Relative movement", function () {
    it("should zoom relative to current zoom", function() {
        var scroller = new Scroller(null, { zooming : true });

        scroller.zoomBy(1.5);
        var values = scroller.getValues();
        assert.equal(values.zoom, 1.5);

        scroller.zoomBy(1.2);
        var values = scroller.getValues();
        assert.equal(values.zoom, 1.5 * 1.2);
    });

    it("should scroll relative to current position", function() {
        var scroller = new Scroller();
        scroller.setDimensions(1000, 600, 5000, 5000);

        scroller.scrollBy(200, 300);
        var values = scroller.getValues();
        assert.equal(values.left, 200);
        assert.equal(values.top, 300);

        scroller.scrollBy(300, 400);
        var values = scroller.getValues();
        assert.equal(values.left, 500);
        assert.equal(values.top, 700);
    });
});
